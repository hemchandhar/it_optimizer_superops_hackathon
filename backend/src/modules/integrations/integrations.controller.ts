import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IntegrationsService } from './integrations.service';

@ApiTags('Integrations')
@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get available integrations' })
  getAvailableIntegrations() {
    return this.integrationsService.getAvailableIntegrations();
  }

  @Post('sync')
  @ApiOperation({ summary: 'Sync data from integration' })
  syncData(@Body() body: { integration: string }) {
    return this.integrationsService.syncData(body.integration);
  }
}
