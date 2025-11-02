#!/bin/bash

# Enterprise IT Optimization Platform - Setup Script
# Team TUA - SuperHack 2025

echo "================================================"
echo "  IT Optimization Platform - Setup"
echo "  Team TUA - SuperHack 2025"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is running
echo -e "${BLUE}Checking Docker...${NC}"
if ! docker info > /dev/null 2>&1; then
    echo -e "${YELLOW}Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker is running${NC}"
echo ""

# Start databases
echo -e "${BLUE}Starting databases...${NC}"
docker compose up -d
echo -e "${GREEN}✓ Databases started${NC}"
echo ""

# Wait for databases to be ready
echo -e "${BLUE}Waiting for databases to be ready...${NC}"
sleep 10
echo -e "${GREEN}✓ Databases ready${NC}"
echo ""

# Setup backend
echo -e "${BLUE}Setting up backend...${NC}"
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

echo -e "${GREEN}✓ Backend setup complete${NC}"
echo ""

# Seed database
echo -e "${BLUE}Seeding database with sample data...${NC}"
npm run seed
echo -e "${GREEN}✓ Database seeded${NC}"
echo ""

# Setup frontend
echo -e "${BLUE}Setting up frontend...${NC}"
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

echo -e "${GREEN}✓ Frontend setup complete${NC}"
echo ""

cd ..

echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}  Setup Complete!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo "To start the application:"
echo ""
echo -e "${BLUE}1. Backend (Terminal 1):${NC}"
echo "   cd backend && npm run start:dev"
echo "   API will be available at: http://localhost:3000"
echo "   Swagger docs: http://localhost:3000/api/docs"
echo ""
echo -e "${BLUE}2. Frontend (Terminal 2):${NC}"
echo "   cd frontend && npm run dev"
echo "   App will be available at: http://localhost:5173"
echo ""
echo -e "${YELLOW}Login credentials:${NC}"
echo "   Email: admin@example.com"
echo "   Password: password123"
echo ""
