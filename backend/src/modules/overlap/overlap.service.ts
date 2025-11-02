import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
import { Overlap, OverlapSeverity } from '../../database/entities/overlap.entity';
import { License } from '../../database/entities/license.entity';

@Injectable()
export class OverlapService {
  constructor(
    @InjectRepository(Overlap)
    private overlapRepository: Repository<Overlap>,
    @InjectRepository(License)
    private licenseRepository: Repository<License>,
  ) {}

  async detectOverlaps(): Promise<Overlap[]> {
    // Get all licenses with features
    const licenses = await this.licenseRepository.find();

    const overlaps: Overlap[] = [];

    // Compare each license pair
    for (let i = 0; i < licenses.length; i++) {
      for (let j = i + 1; j < licenses.length; j++) {
        const license1 = licenses[i];
        const license2 = licenses[j];

        if (!license1.features || !license2.features) continue;

        const commonFeatures = license1.features.filter(f =>
          license2.features.includes(f)
        );

        if (commonFeatures.length > 0) {
          const overlapPercentage = (commonFeatures.length / Math.max(license1.features.length, license2.features.length)) * 100;

          let severity = OverlapSeverity.LOW;
          if (overlapPercentage > 70) severity = OverlapSeverity.CRITICAL;
          else if (overlapPercentage > 50) severity = OverlapSeverity.HIGH;
          else if (overlapPercentage > 30) severity = OverlapSeverity.MEDIUM;

          const overlap = this.overlapRepository.create({
            software1: license1.software,
            software2: license2.software,
            commonFeatures,
            featureOverlapCount: commonFeatures.length,
            overlapPercentage,
            severity,
            costImpact: parseFloat(license1.totalCost.toString()) + parseFloat(license2.totalCost.toString()),
            isConsolidatable: overlapPercentage > 60,
          });

          overlaps.push(await this.overlapRepository.save(overlap));
        }
      }
    }

    return overlaps;
  }

  async findAll(): Promise<Overlap[]> {
    return this.overlapRepository.find({ order: { overlapPercentage: 'DESC' } });
  }

  async getAnalytics(): Promise<any> {
    const overlaps = await this.findAll();
    const totalSavings = overlaps
      .filter(o => o.isConsolidatable)
      .reduce((sum, o) => sum + parseFloat(o.potentialSavings.toString()), 0);

    return {
      summary: {
        totalOverlaps: overlaps.length,
        consolidatableOverlaps: overlaps.filter(o => o.isConsolidatable).length,
        totalPotentialSavings: totalSavings,
      },
      bySeverity: overlaps.reduce((acc, o) => {
        acc[o.severity] = (acc[o.severity] || 0) + 1;
        return acc;
      }, {}),
      topOverlaps: overlaps.slice(0, 10),
    };
  }
}
