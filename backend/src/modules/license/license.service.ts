import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { License, LicenseStatus } from '../../database/entities/license.entity';
import { CreateLicenseDto } from './dto/create-license.dto';

@Injectable()
export class LicenseService {
  constructor(
    @InjectRepository(License)
    private licenseRepository: Repository<License>,
  ) {}

  async create(createLicenseDto: CreateLicenseDto): Promise<License> {
    const license = this.licenseRepository.create(createLicenseDto);

    // Calculate utilization rate
    license.utilizationRate = (createLicenseDto.usedSeats || 0) / createLicenseDto.totalSeats * 100;

    return this.licenseRepository.save(license);
  }

  async findAll(): Promise<License[]> {
    return this.licenseRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<License> {
    return this.licenseRepository.findOne({ where: { id } });
  }

  async update(id: string, updateData: Partial<CreateLicenseDto>): Promise<License> {
    await this.licenseRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.licenseRepository.delete(id);
  }

  async getUnderutilized(threshold: number = 50): Promise<License[]> {
    return this.licenseRepository
      .createQueryBuilder('license')
      .where('license.utilizationRate < :threshold', { threshold })
      .andWhere('license.status = :status', { status: LicenseStatus.ACTIVE })
      .orderBy('license.utilizationRate', 'ASC')
      .getMany();
  }

  async getOptimizationOpportunities(): Promise<any> {
    const licenses = await this.findAll();
    const underutilized = await this.getUnderutilized();

    let totalPotentialSavings = 0;
    const recommendations = [];

    for (const license of underutilized) {
      const unusedSeats = license.totalSeats - license.usedSeats;
      const potentialSavings = unusedSeats * parseFloat(license.costPerSeat.toString());
      totalPotentialSavings += potentialSavings;

      recommendations.push({
        licenseId: license.id,
        software: license.software,
        currentSeats: license.totalSeats,
        usedSeats: license.usedSeats,
        recommendedSeats: Math.ceil(license.usedSeats * 1.1), // 10% buffer
        potentialSavings,
        utilizationRate: license.utilizationRate,
        action: 'Reduce license count',
      });
    }

    return {
      totalLicenses: licenses.length,
      underutilizedLicenses: underutilized.length,
      totalPotentialSavings,
      recommendations,
    };
  }

  async getAnalytics(): Promise<any> {
    const licenses = await this.findAll();

    const totalCost = licenses.reduce((sum, l) => sum + parseFloat(l.totalCost.toString()), 0);
    const totalSeats = licenses.reduce((sum, l) => sum + l.totalSeats, 0);
    const usedSeats = licenses.reduce((sum, l) => sum + l.usedSeats, 0);
    const overallUtilization = (usedSeats / totalSeats) * 100;

    const byVendor = licenses.reduce((acc, license) => {
      if (!acc[license.vendor]) {
        acc[license.vendor] = { count: 0, cost: 0, seats: 0 };
      }
      acc[license.vendor].count++;
      acc[license.vendor].cost += parseFloat(license.totalCost.toString());
      acc[license.vendor].seats += license.totalSeats;
      return acc;
    }, {});

    const byStatus = licenses.reduce((acc, license) => {
      acc[license.status] = (acc[license.status] || 0) + 1;
      return acc;
    }, {});

    return {
      summary: {
        totalLicenses: licenses.length,
        totalCost,
        totalSeats,
        usedSeats,
        overallUtilization: overallUtilization.toFixed(2),
      },
      byVendor,
      byStatus,
      costTrends: await this.getCostTrends(),
    };
  }

  private async getCostTrends(): Promise<any> {
    // Placeholder for time-series cost trends
    // This would typically query TimescaleDB for historical data
    return {
      monthly: [],
      quarterly: [],
    };
  }
}
