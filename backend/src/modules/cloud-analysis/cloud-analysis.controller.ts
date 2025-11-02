import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CloudAnalysisService } from './cloud-analysis.service';

@ApiTags('Cloud Analysis')
@Controller('cloud-analysis')
export class CloudAnalysisController {
  constructor(private readonly cloudAnalysisService: CloudAnalysisService) {}

  @Post()
  @ApiOperation({ summary: 'Create cloud resource entry' })
  create(@Body() createData: any) {
    return this.cloudAnalysisService.create(createData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cloud resources' })
  findAll() {
    return this.cloudAnalysisService.findAll();
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get cloud vs on-premise analytics' })
  getAnalytics() {
    return this.cloudAnalysisService.getAnalytics();
  }
}
