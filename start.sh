#!/bin/bash

# Enterprise IT Optimization Platform - Start Script
# Team TUA - SuperHack 2025

echo "================================================"
echo "  IT Optimization Platform - Starting"
echo "  Team TUA - SuperHack 2025"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if databases are running
echo -e "${BLUE}Checking databases...${NC}"
if ! docker-compose ps | grep -q "Up"; then
    echo -e "${YELLOW}Databases are not running. Starting them...${NC}"
    docker-compose up -d
    sleep 10
fi
echo -e "${GREEN}✓ Databases are running${NC}"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}Shutting down...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start backend
echo -e "${BLUE}Starting backend...${NC}"
cd backend
npm run start:dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 5
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"
echo -e "   API: http://localhost:3000"
echo -e "   Docs: http://localhost:3000/api/docs"
echo ""

# Start frontend
echo -e "${BLUE}Starting frontend...${NC}"
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
sleep 3
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"
echo -e "   App: http://localhost:5173"
echo ""

echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}  Application is running!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo -e "${BLUE}Access the application at:${NC} http://localhost:5173"
echo -e "${BLUE}API Documentation at:${NC} http://localhost:3000/api/docs"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

# Keep script running
wait
