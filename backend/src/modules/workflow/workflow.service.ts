import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workflow } from '../../database/entities/workflow.entity';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow)
    private workflowRepository: Repository<Workflow>,
  ) {}

  async create(createData: Partial<Workflow>): Promise<Workflow> {
    const workflow = this.workflowRepository.create(createData);
    // Calculate efficiency score
    if (workflow.totalRuns > 0) {
      workflow.efficiencyScore = (workflow.successfulRuns / workflow.totalRuns) * 100;
    }
    return this.workflowRepository.save(workflow);
  }

  async findAll(): Promise<Workflow[]> {
    return this.workflowRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Workflow> {
    return this.workflowRepository.findOne({ where: { id } });
  }

  async getInefficient(): Promise<Workflow[]> {
    return this.workflowRepository
      .createQueryBuilder('workflow')
      .where('workflow.efficiencyScore < :threshold', { threshold: 70 })
      .orWhere('workflow.creditsUsed > workflow.creditsAllotted * 0.8')
      .getMany();
  }

  async getAnalytics(): Promise<any> {
    const workflows = await this.findAll();
    const totalCost = workflows.reduce((sum, w) => sum + parseFloat(w.monthlyCost.toString()), 0);
    const avgEfficiency = workflows.reduce((sum, w) => sum + parseFloat(w.efficiencyScore.toString()), 0) / workflows.length;

    return {
      summary: {
        totalWorkflows: workflows.length,
        totalMonthlyCost: totalCost,
        averageEfficiency: avgEfficiency.toFixed(2),
        inefficientWorkflows: workflows.filter(w => w.isInefficient).length,
      },
      byPlatform: workflows.reduce((acc, w) => {
        acc[w.platform] = (acc[w.platform] || 0) + 1;
        return acc;
      }, {}),
    };
  }
}
