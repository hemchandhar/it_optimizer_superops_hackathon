import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get comprehensive dashboard summary' })
  getDashboard() {
    return this.analyticsService.getDashboardSummary();
  }

  @Get('recommendations')
  @ApiOperation({ summary: 'Get AI-powered optimization recommendations' })
  getRecommendations() {
    return this.analyticsService.getRecommendations();
  }
}
