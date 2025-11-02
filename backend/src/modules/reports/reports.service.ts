import { Injectable } from '@nestjs/common';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable()
export class ReportsService {
  constructor(private analyticsService: AnalyticsService) {}

  async generateExecutiveReport(): Promise<any> {
    const dashboard = await this.analyticsService.getDashboardSummary();
    const recommendations = await this.analyticsService.getRecommendations();

    return {
      reportType: 'Executive Summary',
      generatedAt: new Date(),
      period: 'Current',
      summary: dashboard.summary,
      keyMetrics: {
        totalITSpend: dashboard.summary.totalITSpend,
        potentialSavings: dashboard.summary.potentialSavings,
        roi: `${dashboard.summary.savingsPercentage}%`,
        optimizationScore: dashboard.summary.optimizationScore,
      },
      recommendations: recommendations.urgent,
      detailedBreakdown: {
        licenses: dashboard.licenses,
        workflows: dashboard.workflows,
        hardware: dashboard.hardware,
        storage: dashboard.storage,
      },
    };
  }

  async generateMSPReport(): Promise<any> {
    const dashboard = await this.analyticsService.getDashboardSummary();

    return {
      reportType: 'MSP Client Report',
      generatedAt: new Date(),
      clientProfitability: {
        totalRevenue: 'TBD',
        totalCosts: dashboard.summary.totalITSpend,
        profitMargin: 'TBD',
      },
      optimizationImpact: {
        currentSpend: dashboard.summary.totalITSpend,
        projectedSavings: dashboard.summary.potentialSavings,
        valueDelivered: dashboard.summary.savingsPercentage,
      },
      growthInsights: {
        optimizationScore: dashboard.summary.optimizationScore,
        areas: ['License Management', 'Workflow Optimization', 'Cloud Migration'],
      },
    };
  }
}
