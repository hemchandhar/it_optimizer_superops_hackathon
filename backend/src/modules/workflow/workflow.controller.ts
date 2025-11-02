import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WorkflowService } from './workflow.service';

@ApiTags('Workflows')
@Controller('workflows')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workflow entry' })
  create(@Body() createData: any) {
    return this.workflowService.create(createData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all workflows' })
  findAll() {
    return this.workflowService.findAll();
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get workflow analytics' })
  getAnalytics() {
    return this.workflowService.getAnalytics();
  }

  @Get('inefficient')
  @ApiOperation({ summary: 'Get inefficient workflows' })
  getInefficient() {
    return this.workflowService.getInefficient();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a workflow by ID' })
  findOne(@Param('id') id: string) {
    return this.workflowService.findOne(id);
  }
}
