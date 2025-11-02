import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OverlapService } from './overlap.service';
import { OverlapController } from './overlap.controller';
import { Overlap } from '../../database/entities/overlap.entity';
import { License } from '../../database/entities/license.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Overlap, License])],
  controllers: [OverlapController],
  providers: [OverlapService],
  exports: [OverlapService],
})
export class OverlapModule {}
