import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OverlapService } from './overlap.service';

@ApiTags('Overlap')
@Controller('overlap')
export class OverlapController {
  constructor(private readonly overlapService: OverlapService) {}

  @Post('detect')
  @ApiOperation({ summary: 'Detect feature overlaps across software' })
  detectOverlaps() {
    return this.overlapService.detectOverlaps();
  }

  @Get()
  @ApiOperation({ summary: 'Get all detected overlaps' })
  findAll() {
    return this.overlapService.findAll();
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get overlap analytics' })
  getAnalytics() {
    return this.overlapService.getAnalytics();
  }
}
