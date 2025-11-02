import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CloudProvider {
  AWS = 'aws',
  AZURE = 'azure',
  GCP = 'gcp',
  ON_PREMISE = 'on_premise',
}

export enum ResourceType {
  COMPUTE = 'compute',
  STORAGE = 'storage',
  DATABASE = 'database',
  NETWORKING = 'networking',
  SERVERLESS = 'serverless',
}

@Entity('cloud_resources')
export class CloudResource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  resourceName: string;

  @Column({ type: 'enum', enum: CloudProvider })
  provider: CloudProvider;

  @Column({ type: 'enum', enum: ResourceType })
  resourceType: ResourceType;

  @Column({ nullable: true })
  instanceType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  monthlyCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  onPremiseEquivalentCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  costDifference: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  utilizationRate: number;

  @Column({ type: 'boolean', default: false })
  isMigrationCandidate: boolean;

  @Column({ nullable: true })
  recommendedAction: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  potentialSavings: number;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  department: string;

  @Column({ type: 'jsonb', nullable: true })
  specifications: any;

  @Column({ type: 'text', nullable: true })
  migrationNotes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
