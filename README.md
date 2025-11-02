# Enterprise IT Optimization Platform

**Team TUA - SuperHack 2025**
**Problem Statement:** Growth / Financial Improvement

![SuperHack 2025](https://img.shields.io/badge/SuperHack-2025-ff69b4)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Overview

An AI-powered analytics solution that provides comprehensive visibility and actionable insights into IT resource utilization. The platform connects with existing enterprise systems to analyze usage patterns, identify optimization opportunities, and deliver measurable cost savings.

### Key Features

- **License Optimization** - Identify underutilized licenses, transferable seats, and right-sizing opportunities
- **Workflow Efficiency** - Credit monitoring and inefficient workflow detection
- **Hardware Utilization** - Over/under allocation analysis and lifecycle management
- **Storage Optimization** - Capacity planning and duplicate storage solutions detection
- **Feature Overlap Detection** - Identify redundant solutions and consolidation opportunities
- **Cloud vs On-Prem Analysis** - Cost comparison and migration recommendations

## 💰 Value Proposition

- **20-40% savings** on IT spend through license optimization and resource right-sizing
- **Continuous optimization** through ongoing monitoring and recommendations
- **Complete IT visibility** across licenses, workflows, hardware, storage, and cloud
- **MSP revenue growth** with built-in client profitability insights

## 🏗️ Architecture

### Three-Tier Architecture

```
┌─────────────────────────────────────────────────┐
│         Presentation & Action Layer             │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │   MSP    │  │    IT    │  │  Executive   │  │
│  │ Dashboard│  │  Manager │  │   Reports    │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│     Intelligence & Analytics Engine             │
│  ┌─────────────┐  ┌──────────────────────────┐ │
│  │   Analytics │  │   ML Recommendation      │ │
│  │    Engine   │  │        Engine            │ │
│  └─────────────┘  └──────────────────────────┘ │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│          Data Ingestion Layer                   │
│  ┌──────┐  ┌──────┐  ┌────────┐  ┌──────────┐ │
│  │ M365 │  │ AWS  │  │ Zapier │  │  Storage │ │
│  └──────┘  └──────┘  └────────┘  └──────────┘ │
└─────────────────────────────────────────────────┘
```

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Docker** and Docker Compose (for local databases)
- **Git**

## 🛠️ Technology Stack

### Backend
- **Framework:** NestJS with TypeScript
- **Databases:**
  - PostgreSQL (Main database)
  - MongoDB (Document storage)
  - Redis (Caching)
  - TimescaleDB (Time-series metrics)
- **ORM:** TypeORM
- **API Documentation:** Swagger/OpenAPI

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **HTTP Client:** Axios

## 🚦 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd super_hackathon
```

### 2. Start Local Databases

```bash
# Start all databases using Docker Compose
docker-compose up -d

# Verify containers are running
docker-compose ps
```

This will start:
- PostgreSQL on port 5432
- TimescaleDB on port 5433
- MongoDB on port 27017
- Redis on port 6379

### 3. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Seed the database with sample data
npm run seed

# Start development server
npm run start:dev
```

The backend API will be available at `http://localhost:3000`
Swagger documentation: `http://localhost:3000/api/docs`

### 4. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📁 Project Structure

```
super_hackathon/
├── backend/                   # NestJS Backend
│   ├── src/
│   │   ├── modules/          # Feature modules
│   │   │   ├── license/      # License optimization
│   │   │   ├── workflow/     # Workflow efficiency
│   │   │   ├── hardware/     # Hardware utilization
│   │   │   ├── storage/      # Storage optimization
│   │   │   ├── overlap/      # Feature overlap detection
│   │   │   ├── cloud-analysis/ # Cloud vs on-prem
│   │   │   ├── analytics/    # Analytics engine
│   │   │   ├── reports/      # Report generation
│   │   │   ├── integrations/ # External integrations
│   │   │   └── auth/         # Authentication
│   │   ├── database/
│   │   │   └── entities/     # TypeORM entities
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   └── seed.ts          # Database seeding script
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── layout/       # Layout components
│   │   │   ├── dashboard/    # Dashboard components
│   │   │   └── charts/       # Chart components
│   │   ├── pages/            # Page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Licenses.tsx
│   │   │   └── ...
│   │   ├── services/         # API services
│   │   ├── types/            # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml        # Local database setup
└── README.md
```

## 🔌 API Endpoints

### Analytics
- `GET /api/v1/analytics/dashboard` - Get comprehensive dashboard summary
- `GET /api/v1/analytics/recommendations` - Get AI-powered recommendations

### Licenses
- `GET /api/v1/licenses` - Get all licenses
- `GET /api/v1/licenses/analytics` - Get license analytics
- `GET /api/v1/licenses/optimization` - Get optimization opportunities
- `GET /api/v1/licenses/underutilized` - Get underutilized licenses
- `POST /api/v1/licenses` - Create new license entry

### Workflows
- `GET /api/v1/workflows` - Get all workflows
- `GET /api/v1/workflows/analytics` - Get workflow analytics
- `GET /api/v1/workflows/inefficient` - Get inefficient workflows

### Hardware
- `GET /api/v1/hardware` - Get all hardware
- `GET /api/v1/hardware/analytics` - Get hardware analytics

### Storage
- `GET /api/v1/storage` - Get all storage solutions
- `GET /api/v1/storage/analytics` - Get storage analytics

### Overlap Detection
- `GET /api/v1/overlap` - Get detected overlaps
- `POST /api/v1/overlap/detect` - Trigger overlap detection
- `GET /api/v1/overlap/analytics` - Get overlap analytics

### Cloud Analysis
- `GET /api/v1/cloud-analysis` - Get cloud resources
- `GET /api/v1/cloud-analysis/analytics` - Get cloud vs on-prem analytics

### Reports
- `GET /api/v1/reports/executive` - Generate executive report
- `GET /api/v1/reports/msp` - Generate MSP client report

### Integrations
- `GET /api/v1/integrations` - Get available integrations
- `POST /api/v1/integrations/sync` - Sync integration data

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `GET /api/v1/auth/users` - Get all users

## 📊 Sample Data

The seed script creates sample data including:
- 3 License entries (Microsoft 365, Adobe Creative Cloud, Salesforce)
- 2 Workflows (Lead Processing, Invoice Generation)
- 2 Hardware items (Production Server, Development Workstation)
- 2 Storage solutions (OneDrive, Dropbox)
- 2 Cloud resources (Web App Server, Database Server)
- 2 Users (Admin, IT Manager)

Run the seed script:
```bash
cd backend
npm run seed
```

## 🎯 Key Metrics & Analytics

### Dashboard Summary
- Total IT Spend
- Potential Savings
- Savings Percentage
- Optimization Score

### License Analytics
- Total licenses and cost
- Seat utilization
- Underutilized licenses
- Cost trends

### Workflow Analytics
- Total workflows
- Average efficiency
- Inefficient workflows
- Credit consumption

### Hardware Analytics
- CPU/Memory utilization
- Under/over-utilized assets
- Lifecycle management

### Storage Analytics
- Total capacity and usage
- Duplicate data detection
- Cost optimization

## 🔐 Security

- Environment variables for sensitive data
- JWT authentication (placeholder in current version)
- Input validation using class-validator
- CORS configuration
- API rate limiting ready

## 📝 Development Scripts

### Backend
```bash
npm run start:dev    # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run seed         # Seed database
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart a specific service
docker-compose restart postgres

# Remove all data
docker-compose down -v
```

## 🤝 Team TUA

- **Team Leader:** Karthik Moulya N
- **Event:** SuperHack 2025 - SuperOps
- **Problem Statement:** Growth / Financial Improvement

## 📄 License

MIT License - see LICENSE file for details

## 🎉 Acknowledgments

- SuperOps for organizing SuperHack 2025
- AWS and H2S for powering the hackathon
- The open-source community for amazing tools and libraries

---

**Built with ❤️ by Team TUA for SuperHack 2025**
# it_optimizer_superops_hackathon
