import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HardwareService } from './hardware.service';

@ApiTags('Hardware')
@Controller('hardware')
export class HardwareController {
  constructor(private readonly hardwareService: HardwareService) {}

  @Post()
  @ApiOperation({ summary: 'Create hardware entry' })
  create(@Body() createData: any) {
    return this.hardwareService.create(createData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all hardware' })
  findAll() {
    return this.hardwareService.findAll();
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get hardware analytics' })
  getAnalytics() {
    return this.hardwareService.getAnalytics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get hardware by ID' })
  findOne(@Param('id') id: string) {
    return this.hardwareService.findOne(id);
  }
}
