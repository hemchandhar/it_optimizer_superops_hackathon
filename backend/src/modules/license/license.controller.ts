import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { LicenseService } from './license.service';
import { CreateLicenseDto } from './dto/create-license.dto';

@ApiTags('Licenses')
@Controller('licenses')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new license entry' })
  @ApiResponse({ status: 201, description: 'License created successfully' })
  create(@Body() createLicenseDto: CreateLicenseDto) {
    return this.licenseService.create(createLicenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all licenses' })
  @ApiResponse({ status: 200, description: 'Returns all licenses' })
  findAll() {
    return this.licenseService.findAll();
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get license analytics and insights' })
  @ApiResponse({ status: 200, description: 'Returns license analytics' })
  getAnalytics() {
    return this.licenseService.getAnalytics();
  }

  @Get('optimization')
  @ApiOperation({ summary: 'Get license optimization opportunities' })
  @ApiResponse({ status: 200, description: 'Returns optimization recommendations' })
  getOptimization() {
    return this.licenseService.getOptimizationOpportunities();
  }

  @Get('underutilized')
  @ApiOperation({ summary: 'Get underutilized licenses' })
  @ApiQuery({ name: 'threshold', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Returns underutilized licenses' })
  getUnderutilized(@Query('threshold') threshold?: number) {
    return this.licenseService.getUnderutilized(threshold);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single license by ID' })
  @ApiResponse({ status: 200, description: 'Returns the license' })
  findOne(@Param('id') id: string) {
    return this.licenseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a license' })
  @ApiResponse({ status: 200, description: 'License updated successfully' })
  update(@Param('id') id: string, @Body() updateLicenseDto: Partial<CreateLicenseDto>) {
    return this.licenseService.update(id, updateLicenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a license' })
  @ApiResponse({ status: 200, description: 'License deleted successfully' })
  remove(@Param('id') id: string) {
    return this.licenseService.remove(id);
  }
}
