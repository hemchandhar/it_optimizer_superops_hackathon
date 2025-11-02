import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudAnalysisService } from './cloud-analysis.service';
import { CloudAnalysisController } from './cloud-analysis.controller';
import { CloudResource } from '../../database/entities/cloud-resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CloudResource])],
  controllers: [CloudAnalysisController],
  providers: [CloudAnalysisService],
  exports: [CloudAnalysisService],
})
export class CloudAnalysisModule {}
