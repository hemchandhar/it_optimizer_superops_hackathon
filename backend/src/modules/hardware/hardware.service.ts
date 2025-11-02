import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hardware } from '../../database/entities/hardware.entity';

@Injectable()
export class HardwareService {
  constructor(
    @InjectRepository(Hardware)
    private hardwareRepository: Repository<Hardware>,
  ) {}

  async create(createData: Partial<Hardware>): Promise<Hardware> {
    const hardware = this.hardwareRepository.create(createData);

    // Mark under/over-utilized
    if (hardware.cpuUtilization < 30 || hardware.memoryUtilization < 30) {
      hardware.isUnderutilized = true;
      hardware.optimizationSuggestion = 'Consider consolidating workloads or downsizing';
    }
    if (hardware.cpuUtilization > 85 || hardware.memoryUtilization > 85) {
      hardware.isOverutilized = true;
      hardware.optimizationSuggestion = 'Consider upgrading or load balancing';
    }

    return this.hardwareRepository.save(hardware);
  }

  async findAll(): Promise<Hardware[]> {
    return this.hardwareRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Hardware> {
    return this.hardwareRepository.findOne({ where: { id } });
  }

  async getAnalytics(): Promise<any> {
    const hardware = await this.findAll();
    const avgCpuUtil = hardware.reduce((sum, h) => sum + parseFloat(h.cpuUtilization.toString()), 0) / hardware.length;
    const avgMemUtil = hardware.reduce((sum, h) => sum + parseFloat(h.memoryUtilization.toString()), 0) / hardware.length;

    return {
      summary: {
        totalHardware: hardware.length,
        averageCpuUtilization: avgCpuUtil.toFixed(2),
        averageMemoryUtilization: avgMemUtil.toFixed(2),
        underutilized: hardware.filter(h => h.isUnderutilized).length,
        overutilized: hardware.filter(h => h.isOverutilized).length,
      },
      byType: hardware.reduce((acc, h) => {
        acc[h.type] = (acc[h.type] || 0) + 1;
        return acc;
      }, {}),
    };
  }
}
