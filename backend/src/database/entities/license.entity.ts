import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum LicenseStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  EXPIRING = 'expiring',
  EXPIRED = 'expired',
}

export enum LicenseType {
  PERPETUAL = 'perpetual',
  SUBSCRIPTION = 'subscription',
  CONCURRENT = 'concurrent',
  NAMED_USER = 'named_user',
}

@Entity('licenses')
export class License {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  software: string;

  @Column()
  vendor: string;

  @Column({ type: 'enum', enum: LicenseType })
  licenseType: LicenseType;

  @Column({ type: 'int' })
  totalSeats: number;

  @Column({ type: 'int', default: 0 })
  usedSeats: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costPerSeat: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalCost: number;

  @Column({ type: 'enum', enum: LicenseStatus, default: LicenseStatus.ACTIVE })
  status: LicenseStatus;

  @Column({ type: 'date' })
  purchaseDate: Date;

  @Column({ type: 'date', nullable: true })
  expiryDate: Date;

  @Column({ type: 'date', nullable: true })
  renewalDate: Date;

  @Column({ type: 'jsonb', nullable: true })
  features: string[];

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  utilizationRate: number;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  assignedTo: string;

  @Column({ type: 'int', default: 0 })
  lastUsedDaysAgo: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
