import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

// Modules
import { LicenseModule } from './modules/license/license.module';
import { WorkflowModule } from './modules/workflow/workflow.module';
import { HardwareModule } from './modules/hardware/hardware.module';
import { StorageModule } from './modules/storage/storage.module';
import { OverlapModule } from './modules/overlap/overlap.module';
import { CloudAnalysisModule } from './modules/cloud-analysis/cloud-analysis.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database - PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
      }),
    }),

    // Schedule for cron jobs
    ScheduleModule.forRoot(),

    // Feature modules
    AuthModule,
    LicenseModule,
    WorkflowModule,
    HardwareModule,
    StorageModule,
    OverlapModule,
    CloudAnalysisModule,
    AnalyticsModule,
    IntegrationsModule,
    ReportsModule,
  ],
})
export class AppModule {}
