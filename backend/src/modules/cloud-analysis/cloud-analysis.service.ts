import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudResource } from '../../database/entities/cloud-resource.entity';

@Injectable()
export class CloudAnalysisService {
  constructor(
    @InjectRepository(CloudResource)
    private cloudResourceRepository: Repository<CloudResource>,
  ) {}

  async create(createData: Partial<CloudResource>): Promise<CloudResource> {
    const resource = this.cloudResourceRepository.create(createData);

    // Calculate cost difference
    resource.costDifference = parseFloat(resource.monthlyCost.toString()) - parseFloat(resource.onPremiseEquivalentCost.toString());

    // Determine if migration candidate
    if (resource.utilizationRate < 40 && resource.costDifference > 100) {
      resource.isMigrationCandidate = true;
      resource.recommendedAction = 'Consider migrating to on-premise for cost savings';
      resource.potentialSavings = Math.abs(resource.costDifference);
    } else if (resource.utilizationRate > 80 && resource.costDifference < -100) {
      resource.isMigrationCandidate = true;
      resource.recommendedAction = 'Consider migrating to cloud for better scalability';
    }

    return this.cloudResourceRepository.save(resource);
  }

  async findAll(): Promise<CloudResource[]> {
    return this.cloudResourceRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getAnalytics(): Promise<any> {
    const resources = await this.findAll();
    const cloudCost = resources.reduce((sum, r) => sum + parseFloat(r.monthlyCost.toString()), 0);
    const onPremCost = resources.reduce((sum, r) => sum + parseFloat(r.onPremiseEquivalentCost.toString()), 0);
    const totalSavings = resources.reduce((sum, r) => sum + parseFloat(r.potentialSavings.toString()), 0);

    return {
      summary: {
        totalResources: resources.length,
        totalCloudCost: cloudCost,
        totalOnPremiseCost: onPremCost,
        costDifference: cloudCost - onPremCost,
        migrationCandidates: resources.filter(r => r.isMigrationCandidate).length,
        potentialSavings: totalSavings,
      },
      byProvider: resources.reduce((acc, r) => {
        if (!acc[r.provider]) acc[r.provider] = { count: 0, cost: 0 };
        acc[r.provider].count++;
        acc[r.provider].cost += parseFloat(r.monthlyCost.toString());
        return acc;
      }, {}),
      byType: resources.reduce((acc, r) => {
        if (!acc[r.resourceType]) acc[r.resourceType] = { count: 0, cost: 0 };
        acc[r.resourceType].count++;
        acc[r.resourceType].cost += parseFloat(r.monthlyCost.toString());
        return acc;
      }, {}),
    };
  }
}
