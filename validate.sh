#!/bin/bash

# GPlan Validation Script
# This script validates the project structure and dependencies

set -e

echo "🔍 GPlan Project Validation"
echo "============================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Found $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js 18 or higher."
    exit 1
fi

# Check if npm is installed
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} Found v$NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found."
    exit 1
fi

echo ""
echo "📁 Validating Project Structure..."
echo ""

# Check backend structure
echo -n "Backend directory... "
if [ -d "backend" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC} Backend directory not found"
    exit 1
fi

echo -n "Backend package.json... "
if [ -f "backend/package.json" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC} backend/package.json not found"
    exit 1
fi

echo -n "Backend tsconfig.json... "
if [ -f "backend/tsconfig.json" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC} backend/tsconfig.json not found"
    exit 1
fi

echo -n "Prisma schema... "
if [ -f "backend/prisma/schema.prisma" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC} backend/prisma/schema.prisma not found"
    exit 1
fi

echo -n "Backend source files... "
if [ -d "backend/src" ] && [ -f "backend/src/server.ts" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC} Backend source files not found"
    exit 1
fi

# Check frontend structure
echo -n "Frontend directory... "
if [ -d "frontend" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC} Frontend directory not found"
    exit 1
fi

echo -n "Frontend package.json... "
if [ -f "frontend/package.json" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC} frontend/package.json not found"
    exit 1
fi

echo -n "Frontend tsconfig.json... "
if [ -f "frontend/tsconfig.json" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC} frontend/tsconfig.json not found"
    exit 1
fi

echo -n "Frontend source files... "
if [ -d "frontend/src" ] && [ -f "frontend/src/App.tsx" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC} Frontend source files not found"
    exit 1
fi

# Check documentation
echo -n "Documentation... "
if [ -d "docs" ] && [ -f "docs/README.md" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC} Documentation not found"
    exit 1
fi

# Check Docker files
echo -n "Docker configuration... "
if [ -f "docker-compose.yml" ] && [ -f "backend/Dockerfile" ] && [ -f "frontend/Dockerfile" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠${NC} Docker files incomplete (optional)"
fi

echo ""
echo "✅ Project structure validation complete!"
echo ""
echo "📋 Next Steps:"
echo "   1. Install backend dependencies: cd backend && npm install"
echo "   2. Install frontend dependencies: cd frontend && npm install"
echo "   3. Configure environment: cp backend/.env.example backend/.env"
echo "   4. Setup PostgreSQL database"
echo "   5. Run migrations: cd backend && npx prisma migrate dev"
echo "   6. Start development servers"
echo ""
echo "📖 See docs/SETUP.md for detailed instructions"
