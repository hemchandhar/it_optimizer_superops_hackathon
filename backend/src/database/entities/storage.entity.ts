import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum StorageType {
  CLOUD = 'cloud',
  ON_PREMISE = 'on_premise',
  HYBRID = 'hybrid',
}

export enum StorageProvider {
  ONEDRIVE = 'onedrive',
  DROPBOX = 'dropbox',
  GOOGLE_DRIVE = 'google_drive',
  BOX = 'box',
  AWS_S3 = 'aws_s3',
  AZURE_BLOB = 'azure_blob',
  NAS = 'nas',
  SAN = 'san',
}

@Entity('storage')
export class Storage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: StorageType })
  type: StorageType;

  @Column({ type: 'enum', enum: StorageProvider })
  provider: StorageProvider;

  @Column({ type: 'bigint', default: 0 })
  totalCapacityGB: number;

  @Column({ type: 'bigint', default: 0 })
  usedCapacityGB: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  utilizationRate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  monthlyCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  costPerGB: number;

  @Column({ type: 'int', default: 0 })
  numberOfUsers: number;

  @Column({ type: 'jsonb', nullable: true })
  duplicateFiles: any;

  @Column({ type: 'bigint', default: 0 })
  duplicateDataSizeGB: number;

  @Column({ type: 'boolean', default: false })
  hasRedundancy: boolean;

  @Column({ nullable: true })
  department: string;

  @Column({ type: 'text', nullable: true })
  optimizationSuggestion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  potentialSavings: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
