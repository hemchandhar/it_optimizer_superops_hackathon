import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum WorkflowStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PAUSED = 'paused',
  ERROR = 'error',
}

export enum WorkflowPlatform {
  ZAPIER = 'zapier',
  POWER_AUTOMATE = 'power_automate',
  MAKE = 'make',
  N8N = 'n8n',
  CUSTOM = 'custom',
}

@Entity('workflows')
export class Workflow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: WorkflowPlatform })
  platform: WorkflowPlatform;

  @Column({ type: 'enum', enum: WorkflowStatus, default: WorkflowStatus.ACTIVE })
  status: WorkflowStatus;

  @Column({ type: 'int', default: 0 })
  totalRuns: number;

  @Column({ type: 'int', default: 0 })
  successfulRuns: number;

  @Column({ type: 'int', default: 0 })
  failedRuns: number;

  @Column({ type: 'int', default: 0 })
  creditsUsed: number;

  @Column({ type: 'int', default: 0 })
  creditsAllotted: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  monthlyCost: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  efficiencyScore: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  avgExecutionTime: number;

  @Column({ type: 'jsonb', nullable: true })
  integrations: string[];

  @Column({ type: 'date', nullable: true })
  lastRunDate: Date;

  @Column({ nullable: true })
  owner: string;

  @Column({ nullable: true })
  department: string;

  @Column({ type: 'boolean', default: false })
  isInefficient: boolean;

  @Column({ type: 'text', nullable: true })
  optimizationSuggestion: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
