import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum OverlapSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

@Entity('overlaps')
export class Overlap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  software1: string;

  @Column()
  software2: string;

  @Column({ type: 'jsonb' })
  commonFeatures: string[];

  @Column({ type: 'int', default: 0 })
  featureOverlapCount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  overlapPercentage: number;

  @Column({ type: 'enum', enum: OverlapSeverity, default: OverlapSeverity.LOW })
  severity: OverlapSeverity;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  costImpact: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  potentialSavings: number;

  @Column({ type: 'text', nullable: true })
  recommendation: string;

  @Column({ type: 'boolean', default: false })
  isConsolidatable: boolean;

  @Column({ nullable: true })
  preferredSolution: string;

  @Column({ type: 'text', nullable: true })
  consolidationReason: string;

  @Column({ type: 'int', default: 0 })
  usersAffected: number;

  @Column({ type: 'boolean', default: false })
  isResolved: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
