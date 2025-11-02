import { Injectable } from '@nestjs/common';
import { LicenseService } from '../license/license.service';
import { WorkflowService } from '../workflow/workflow.service';
import { HardwareService } from '../hardware/hardware.service';
import { StorageService } from '../storage/storage.service';
import { OverlapService } from '../overlap/overlap.service';
import { CloudAnalysisService } from '../cloud-analysis/cloud-analysis.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private licenseService: LicenseService,
    private workflowService: WorkflowService,
    private hardwareService: HardwareService,
    private storageService: StorageService,
    private overlapService: OverlapService,
    private cloudAnalysisService: CloudAnalysisService,
  ) {}

  async getDashboardSummary(): Promise<any> {
    const [
      licenseAnalytics,
      workflowAnalytics,
      hardwareAnalytics,
      storageAnalytics,
      overlapAnalytics,
      cloudAnalytics,
    ] = await Promise.all([
      this.licenseService.getAnalytics(),
      this.workflowService.getAnalytics(),
      this.hardwareService.getAnalytics(),
      this.storageService.getAnalytics(),
      this.overlapService.getAnalytics(),
      this.cloudAnalysisService.getAnalytics(),
    ]);

    // Calculate total IT spend
    const totalITSpend =
      parseFloat(licenseAnalytics.summary.totalCost || 0) +
      parseFloat(workflowAnalytics.summary.totalMonthlyCost || 0) +
      parseFloat(storageAnalytics.summary.totalMonthlyCost || 0) +
      parseFloat(cloudAnalytics.summary.totalCloudCost || 0);

    // Calculate total potential savings
    const totalSavings =
      parseFloat(storageAnalytics.summary.potentialSavings || 0) +
      parseFloat(overlapAnalytics.summary.totalPotentialSavings || 0) +
      parseFloat(cloudAnalytics.summary.potentialSavings || 0);

    return {
      summary: {
        totalITSpend: totalITSpend.toFixed(2),
        potentialSavings: totalSavings.toFixed(2),
        savingsPercentage: ((totalSavings / totalITSpend) * 100).toFixed(2),
        optimizationScore: this.calculateOptimizationScore({
          licenseAnalytics,
          workflowAnalytics,
          hardwareAnalytics,
          storageAnalytics,
        }),
      },
      licenses: licenseAnalytics.summary,
      workflows: workflowAnalytics.summary,
      hardware: hardwareAnalytics.summary,
      storage: storageAnalytics.summary,
      overlaps: overlapAnalytics.summary,
      cloudResources: cloudAnalytics.summary,
    };
  }

  async getRecommendations(): Promise<any> {
    const licenseOps = await this.licenseService.getOptimizationOpportunities();

    return {
      urgent: [
        {
          category: 'License Optimization',
          priority: 'high',
          impact: 'High cost reduction',
          action: `Reduce ${licenseOps.underutilizedLicenses} underutilized licenses`,
          potentialSavings: licenseOps.totalPotentialSavings,
        },
      ],
      recommended: licenseOps.recommendations.slice(0, 10),
      quick_wins: [],
    };
  }

  private calculateOptimizationScore(data: any): number {
    // Simple scoring algorithm
    const licenseScore = parseFloat(data.licenseAnalytics.summary.overallUtilization || 0);
    const workflowScore = parseFloat(data.workflowAnalytics.summary.averageEfficiency || 0);
    const hardwareScore = parseFloat(data.hardwareAnalytics.summary.averageCpuUtilization || 0);
    const storageScore = parseFloat(data.storageAnalytics.summary.overallUtilization || 0);

    return Math.round((licenseScore + workflowScore + hardwareScore + storageScore) / 4);
  }
}
