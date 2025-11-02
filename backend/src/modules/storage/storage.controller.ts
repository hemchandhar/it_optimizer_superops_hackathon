import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StorageService } from './storage.service';

@ApiTags('Storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  @ApiOperation({ summary: 'Create storage entry' })
  create(@Body() createData: any) {
    return this.storageService.create(createData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all storage solutions' })
  findAll() {
    return this.storageService.findAll();
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get storage analytics' })
  getAnalytics() {
    return this.storageService.getAnalytics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get storage by ID' })
  findOne(@Param('id') id: string) {
    return this.storageService.findOne(id);
  }
}
