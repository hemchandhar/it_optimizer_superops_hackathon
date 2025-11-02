import { IsString, IsEnum, IsNumber, IsDate, IsOptional, IsArray } from 'class-validator';
import { LicenseStatus, LicenseType } from '../../../database/entities/license.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLicenseDto {
  @ApiProperty({ example: 'Microsoft Office 365' })
  @IsString()
  software: string;

  @ApiProperty({ example: 'Microsoft' })
  @IsString()
  vendor: string;

  @ApiProperty({ enum: LicenseType, example: LicenseType.SUBSCRIPTION })
  @IsEnum(LicenseType)
  licenseType: LicenseType;

  @ApiProperty({ example: 100 })
  @IsNumber()
  totalSeats: number;

  @ApiProperty({ example: 75, required: false })
  @IsNumber()
  @IsOptional()
  usedSeats?: number;

  @ApiProperty({ example: 12.50 })
  @IsNumber()
  costPerSeat: number;

  @ApiProperty({ example: 1250.00 })
  @IsNumber()
  totalCost: number;

  @ApiProperty({ enum: LicenseStatus, example: LicenseStatus.ACTIVE, required: false })
  @IsEnum(LicenseStatus)
  @IsOptional()
  status?: LicenseStatus;

  @ApiProperty({ example: '2024-01-01' })
  @IsDate()
  purchaseDate: Date;

  @ApiProperty({ example: '2025-01-01', required: false })
  @IsDate()
  @IsOptional()
  expiryDate?: Date;

  @ApiProperty({ example: '2024-12-01', required: false })
  @IsDate()
  @IsOptional()
  renewalDate?: Date;

  @ApiProperty({ example: ['email', 'calendar', 'cloud storage'], required: false })
  @IsArray()
  @IsOptional()
  features?: string[];

  @ApiProperty({ example: 'IT Department', required: false })
  @IsString()
  @IsOptional()
  department?: string;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsString()
  @IsOptional()
  assignedTo?: string;
}
