import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { LicenseModule } from '../license/license.module';
import { WorkflowModule } from '../workflow/workflow.module';
import { HardwareModule } from '../hardware/hardware.module';
import { StorageModule } from '../storage/storage.module';
import { OverlapModule } from '../overlap/overlap.module';
import { CloudAnalysisModule } from '../cloud-analysis/cloud-analysis.module';

@Module({
  imports: [
    LicenseModule,
    WorkflowModule,
    HardwareModule,
    StorageModule,
    OverlapModule,
    CloudAnalysisModule,
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
