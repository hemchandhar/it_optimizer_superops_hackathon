import { DataSource } from 'typeorm';
import { License, LicenseType, LicenseStatus } from './database/entities/license.entity';
import { Workflow, WorkflowPlatform, WorkflowStatus } from './database/entities/workflow.entity';
import { Hardware, HardwareType, HardwareStatus } from './database/entities/hardware.entity';
import { Storage, StorageType, StorageProvider } from './database/entities/storage.entity';
import { CloudResource, CloudProvider, ResourceType } from './database/entities/cloud-resource.entity';
import { User, UserRole } from './database/entities/user.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'itoptimizer',
  password: process.env.POSTGRES_PASSWORD || 'password123',
  database: process.env.POSTGRES_DB || 'it_optimization',
  entities: [__dirname + '/database/entities/*.entity{.ts,.js}'],
  synchronize: true,
});

async function seed() {
  console.log('🌱 Seeding database...');

  await AppDataSource.initialize();

  const licenseRepo = AppDataSource.getRepository(License);
  const workflowRepo = AppDataSource.getRepository(Workflow);
  const hardwareRepo = AppDataSource.getRepository(Hardware);
  const storageRepo = AppDataSource.getRepository(Storage);
  const cloudRepo = AppDataSource.getRepository(CloudResource);
  const userRepo = AppDataSource.getRepository(User);

  // Seed Users
  const users = [
    {
      email: 'admin@example.com',
      password: 'password123',
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      company: 'TechCorp',
    },
    {
      email: 'manager@example.com',
      password: 'password123',
      firstName: 'IT',
      lastName: 'Manager',
      role: UserRole.IT_MANAGER,
      department: 'IT',
      company: 'TechCorp',
    },
  ];
  await userRepo.save(users);

  // Seed Licenses
  const licenses = [
    {
      software: 'Microsoft Office 365',
      vendor: 'Microsoft',
      licenseType: LicenseType.SUBSCRIPTION,
      totalSeats: 100,
      usedSeats: 65,
      costPerSeat: 12.50,
      totalCost: 1250,
      status: LicenseStatus.ACTIVE,
      purchaseDate: new Date('2024-01-01'),
      expiryDate: new Date('2025-01-01'),
      features: ['email', 'calendar', 'word', 'excel', 'powerpoint', 'teams'],
      department: 'Company-wide',
      utilizationRate: 65,
    },
    {
      software: 'Adobe Creative Cloud',
      vendor: 'Adobe',
      licenseType: LicenseType.SUBSCRIPTION,
      totalSeats: 50,
      usedSeats: 15,
      costPerSeat: 52.99,
      totalCost: 2649.50,
      status: LicenseStatus.ACTIVE,
      purchaseDate: new Date('2024-03-01'),
      expiryDate: new Date('2025-03-01'),
      features: ['photoshop', 'illustrator', 'indesign', 'premiere'],
      department: 'Design',
      utilizationRate: 30,
    },
    {
      software: 'Salesforce CRM',
      vendor: 'Salesforce',
      licenseType: LicenseType.NAMED_USER,
      totalSeats: 30,
      usedSeats: 28,
      costPerSeat: 150,
      totalCost: 4500,
      status: LicenseStatus.ACTIVE,
      purchaseDate: new Date('2023-06-01'),
      renewalDate: new Date('2025-06-01'),
      features: ['crm', 'sales', 'reports', 'dashboards'],
      department: 'Sales',
      utilizationRate: 93,
    },
  ];
  await licenseRepo.save(licenses);

  // Seed Workflows
  const workflows = [
    {
      name: 'Lead Processing Automation',
      description: 'Automatically process and assign leads from web forms',
      platform: WorkflowPlatform.ZAPIER,
      status: WorkflowStatus.ACTIVE,
      totalRuns: 1500,
      successfulRuns: 1425,
      failedRuns: 75,
      creditsUsed: 3500,
      creditsAllotted: 5000,
      monthlyCost: 49.99,
      efficiencyScore: 95,
      avgExecutionTime: 2.5,
      integrations: ['Salesforce', 'Google Sheets', 'Gmail'],
      owner: 'Sales Team',
      department: 'Sales',
    },
    {
      name: 'Invoice Generation',
      description: 'Generate and send invoices automatically',
      platform: WorkflowPlatform.POWER_AUTOMATE,
      status: WorkflowStatus.ACTIVE,
      totalRuns: 500,
      successfulRuns: 300,
      failedRuns: 200,
      creditsUsed: 4800,
      creditsAllotted: 5000,
      monthlyCost: 35,
      efficiencyScore: 60,
      avgExecutionTime: 15,
      integrations: ['Dynamics 365', 'SharePoint'],
      owner: 'Finance Team',
      department: 'Finance',
      isInefficient: true,
      optimizationSuggestion: 'High failure rate, review workflow logic',
    },
  ];
  await workflowRepo.save(workflows);

  // Seed Hardware
  const hardware = [
    {
      name: 'Production Server 01',
      type: HardwareType.SERVER,
      manufacturer: 'Dell',
      model: 'PowerEdge R740',
      serialNumber: 'SRV-001',
      status: HardwareStatus.ACTIVE,
      cpuUtilization: 85,
      memoryUtilization: 78,
      diskUtilization: 65,
      totalCpu: 32,
      totalMemoryGB: 128,
      totalDiskGB: 2000,
      purchaseCost: 8500,
      purchaseDate: new Date('2022-01-15'),
      location: 'Data Center A',
      department: 'IT',
      isOverutilized: true,
      optimizationSuggestion: 'Consider load balancing or upgrading',
      ageInMonths: 34,
    },
    {
      name: 'Development Workstation',
      type: HardwareType.WORKSTATION,
      manufacturer: 'HP',
      model: 'Z4 G4',
      serialNumber: 'WKS-045',
      status: HardwareStatus.ACTIVE,
      cpuUtilization: 15,
      memoryUtilization: 25,
      diskUtilization: 40,
      totalCpu: 16,
      totalMemoryGB: 64,
      totalDiskGB: 1000,
      purchaseCost: 3200,
      purchaseDate: new Date('2023-05-01'),
      location: 'Office Floor 3',
      department: 'Engineering',
      isUnderutilized: true,
      optimizationSuggestion: 'Consider consolidating workloads',
      ageInMonths: 18,
    },
  ];
  await hardwareRepo.save(hardware);

  // Seed Storage
  const storage = [
    {
      name: 'OneDrive for Business',
      type: StorageType.CLOUD,
      provider: StorageProvider.ONEDRIVE,
      totalCapacityGB: 5000,
      usedCapacityGB: 3200,
      utilizationRate: 64,
      monthlyCost: 500,
      costPerGB: 0.10,
      numberOfUsers: 100,
      duplicateDataSizeGB: 450,
      hasRedundancy: true,
      department: 'Company-wide',
      potentialSavings: 45,
      optimizationSuggestion: 'Remove 450GB of duplicate data to save $45/month',
    },
    {
      name: 'Dropbox Business',
      type: StorageType.CLOUD,
      provider: StorageProvider.DROPBOX,
      totalCapacityGB: 2000,
      usedCapacityGB: 450,
      utilizationRate: 22.5,
      monthlyCost: 240,
      costPerGB: 0.12,
      numberOfUsers: 20,
      duplicateDataSizeGB: 80,
      hasRedundancy: false,
      department: 'Marketing',
      potentialSavings: 9.6,
      optimizationSuggestion: 'Low utilization - consider downsizing plan',
    },
  ];
  await storageRepo.save(storage);

  // Seed Cloud Resources
  const cloudResources = [
    {
      resourceName: 'Web Application Server',
      provider: CloudProvider.AWS,
      resourceType: ResourceType.COMPUTE,
      instanceType: 't3.large',
      monthlyCost: 850,
      onPremiseEquivalentCost: 1200,
      costDifference: -350,
      utilizationRate: 75,
      isMigrationCandidate: false,
      recommendedAction: 'Keep in cloud - cost effective',
      potentialSavings: 0,
      region: 'us-east-1',
      department: 'Engineering',
    },
    {
      resourceName: 'Database Server',
      provider: CloudProvider.AWS,
      resourceType: ResourceType.DATABASE,
      instanceType: 'db.r5.xlarge',
      monthlyCost: 1200,
      onPremiseEquivalentCost: 800,
      costDifference: 400,
      utilizationRate: 35,
      isMigrationCandidate: true,
      recommendedAction: 'Consider on-premise migration',
      potentialSavings: 400,
      region: 'us-east-1',
      department: 'Engineering',
    },
  ];
  await cloudRepo.save(cloudResources);

  console.log('✅ Database seeded successfully!');
  console.log(`
  Created:
  - ${users.length} Users
  - ${licenses.length} Licenses
  - ${workflows.length} Workflows
  - ${hardware.length} Hardware items
  - ${storage.length} Storage solutions
  - ${cloudResources.length} Cloud resources
  `);

  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('❌ Error seeding database:', error);
  process.exit(1);
});
