import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum HardwareType {
  SERVER = 'server',
  WORKSTATION = 'workstation',
  LAPTOP = 'laptop',
  NETWORK_DEVICE = 'network_device',
  STORAGE_DEVICE = 'storage_device',
}

export enum HardwareStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
  DECOMMISSIONED = 'decommissioned',
}

@Entity('hardware')
export class Hardware {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: HardwareType })
  type: HardwareType;

  @Column()
  manufacturer: string;

  @Column()
  model: string;

  @Column({ nullable: true })
  serialNumber: string;

  @Column({ type: 'enum', enum: HardwareStatus, default: HardwareStatus.ACTIVE })
  status: HardwareStatus;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  cpuUtilization: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  memoryUtilization: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  diskUtilization: number;

  @Column({ type: 'int', default: 0 })
  totalCpu: number;

  @Column({ type: 'int', default: 0 })
  totalMemoryGB: number;

  @Column({ type: 'int', default: 0 })
  totalDiskGB: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  purchaseCost: number;

  @Column({ type: 'date', nullable: true })
  purchaseDate: Date;

  @Column({ type: 'date', nullable: true })
  warrantyExpiry: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  assignedTo: string;

  @Column({ nullable: true })
  department: string;

  @Column({ type: 'boolean', default: false })
  isUnderutilized: boolean;

  @Column({ type: 'boolean', default: false })
  isOverutilized: boolean;

  @Column({ type: 'text', nullable: true })
  optimizationSuggestion: string;

  @Column({ type: 'int', default: 0 })
  ageInMonths: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
