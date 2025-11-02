export interface DashboardSummary {
  summary: {
    totalITSpend: string;
    potentialSavings: string;
    savingsPercentage: string;
    optimizationScore: number;
  };
  licenses: {
    totalLicenses: number;
    totalCost: number;
    totalSeats: number;
    usedSeats: number;
    overallUtilization: string;
  };
  workflows: {
    totalWorkflows: number;
    totalMonthlyCost: number;
    averageEfficiency: string;
    inefficientWorkflows: number;
  };
  hardware: {
    totalHardware: number;
    averageCpuUtilization: string;
    averageMemoryUtilization: string;
    underutilized: number;
    overutilized: number;
  };
  storage: {
    totalStorageSolutions: number;
    totalCapacityGB: number;
    totalUsedGB: number;
    overallUtilization: string;
    totalMonthlyCost: number;
    potentialSavings: number;
  };
  overlaps: {
    totalOverlaps: number;
    consolidatableOverlaps: number;
    totalPotentialSavings: number;
  };
  cloudResources: {
    totalResources: number;
    totalCloudCost: number;
    totalOnPremiseCost: number;
    costDifference: number;
    migrationCandidates: number;
    potentialSavings: number;
  };
}

export interface Recommendation {
  category: string;
  priority: string;
  impact: string;
  action: string;
  potentialSavings: number;
}

export interface License {
  id: string;
  software: string;
  vendor: string;
  totalSeats: number;
  usedSeats: number;
  costPerSeat: number;
  totalCost: number;
  status: string;
  utilizationRate: number;
  department: string;
}

export interface Workflow {
  id: string;
  name: string;
  platform: string;
  status: string;
  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;
  creditsUsed: number;
  creditsAllotted: number;
  monthlyCost: number;
  efficiencyScore: number;
  isInefficient: boolean;
}

export interface Hardware {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  cpuUtilization: number;
  memoryUtilization: number;
  diskUtilization: number;
  isUnderutilized: boolean;
  isOverutilized: boolean;
  optimizationSuggestion: string;
}

export interface Storage {
  id: string;
  name: string;
  type: string;
  provider: string;
  totalCapacityGB: number;
  usedCapacityGB: number;
  utilizationRate: number;
  monthlyCost: number;
  potentialSavings: number;
  optimizationSuggestion: string;
}
