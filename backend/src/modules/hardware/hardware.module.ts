import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HardwareService } from './hardware.service';
import { HardwareController } from './hardware.controller';
import { Hardware } from '../../database/entities/hardware.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hardware])],
  controllers: [HardwareController],
  providers: [HardwareService],
  exports: [HardwareService],
})
export class HardwareModule {}
