import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Storage } from '../../database/entities/storage.entity';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage)
    private storageRepository: Repository<Storage>,
  ) {}

  async create(createData: Partial<Storage>): Promise<Storage> {
    const storage = this.storageRepository.create(createData);
    storage.utilizationRate = (storage.usedCapacityGB / storage.totalCapacityGB) * 100;

    // Calculate potential savings from duplicate removal
    if (storage.duplicateDataSizeGB > 0) {
      storage.potentialSavings = storage.duplicateDataSizeGB * parseFloat(storage.costPerGB.toString());
      storage.optimizationSuggestion = `Remove ${storage.duplicateDataSizeGB}GB of duplicate data to save $${storage.potentialSavings.toFixed(2)}/month`;
    }

    return this.storageRepository.save(storage);
  }

  async findAll(): Promise<Storage[]> {
    return this.storageRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Storage> {
    return this.storageRepository.findOne({ where: { id } });
  }

  async getAnalytics(): Promise<any> {
    const storage = await this.findAll();
    const totalCapacity = storage.reduce((sum, s) => sum + Number(s.totalCapacityGB), 0);
    const totalUsed = storage.reduce((sum, s) => sum + Number(s.usedCapacityGB), 0);
    const totalCost = storage.reduce((sum, s) => sum + parseFloat(s.monthlyCost.toString()), 0);
    const totalSavings = storage.reduce((sum, s) => sum + parseFloat(s.potentialSavings.toString()), 0);

    return {
      summary: {
        totalStorageSolutions: storage.length,
        totalCapacityGB: totalCapacity,
        totalUsedGB: totalUsed,
        overallUtilization: ((totalUsed / totalCapacity) * 100).toFixed(2),
        totalMonthlyCost: totalCost,
        potentialSavings: totalSavings,
      },
      byType: storage.reduce((acc, s) => {
        if (!acc[s.type]) acc[s.type] = { count: 0, capacity: 0, cost: 0 };
        acc[s.type].count++;
        acc[s.type].capacity += Number(s.totalCapacityGB);
        acc[s.type].cost += parseFloat(s.monthlyCost.toString());
        return acc;
      }, {}),
    };
  }
}
