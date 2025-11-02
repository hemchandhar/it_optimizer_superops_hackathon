import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReportsService } from './reports.service';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('executive')
  @ApiOperation({ summary: 'Generate executive summary report' })
  getExecutiveReport() {
    return this.reportsService.generateExecutiveReport();
  }

  @Get('msp')
  @ApiOperation({ summary: 'Generate MSP client profitability report' })
  getMSPReport() {
    return this.reportsService.generateMSPReport();
  }
}
