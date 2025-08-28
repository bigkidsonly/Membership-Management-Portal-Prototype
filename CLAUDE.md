# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the TMC (The Movement Cooperative) Membership Management Portal - a full-stack application built during a hackathon to manage member organizations, users, and marketplace tools. The system uses a microservices architecture with Docker containers.

## Development Commands

### Frontend (React + Vite + TypeScript)
- Start development server: `cd web-app/frontend && npm run dev`
- Build: `cd web-app/frontend && npm run build`
- Lint: `cd web-app/frontend && npm run lint`
- Preview build: `cd web-app/frontend && npm run preview`

### Backend (Flask + Python)
- Start full app with Docker: `make app`
- Start backend only: `make backend`
- Interactive shell: `make shell`

### Python Code Quality
- Format and lint: `make ruff` (runs `ruff check --fix .` and `ruff format .`)

### Docker Services
- Full application: `docker compose up app --build --force-recreate`
- Backend only: `docker compose up backend --build --force-recreate`

## Architecture

### Database Layer
- **Primary Database**: PostgreSQL hosted on Supabase (production)
- **Schema**: All tables use `tmc_dev` schema
- **ORM**: SQLAlchemy with Flask-SQLAlchemy
- **Models Location**: `web-app/backend/utilities/models.py`
- **Key Models**: TMC_Organization, User, Role, Tools, Orders, Vendors
- **Data Access Control**: Users can access multiple organizations through data sharing relationships

### Backend (Flask)
- **Entry Point**: `web-app/backend/server.py`
- **Configuration**: `web-app/backend/config.py`
- **Authentication**: Flask-Security with role-based access control
- **API Routes**: Organized in `web-app/backend/routes/` directory
  - `core.py`: Main application routes
  - `api_membership.py`: Membership management APIs
  - `api_tools.py`: Marketplace tools APIs
  - `auth.py`: Authentication endpoints
- **Database Migrations**: Alembic migrations in `migration-service/`

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript and Vite
- **Routing**: React Router v6 (`src/AppRouter.tsx`)
- **Styling**: Tailwind CSS with custom components in `src/components/ui/`
- **Database Client**: Supabase client (`src/lib/supabase.ts`)
- **State Management**: React Context for auth and user data
- **Main Sections**:
  - Dashboard: Overview with metrics and panels
  - Directory: Member organization management
  - Affiliates: Affiliate relationship management  
  - Marketplace: Tool catalog and ordering system
  - Billing: Payment and invoice management
  - User Management: User roles and permissions

### Key Data Relationships
- Organizations have data sharing relationships enabling cross-org data access
- Users belong to organizations and inherit access through sharing agreements
- Tools are organized by categories and vendors with tier-based pricing
- Orders contain multiple order items linking to specific tools

### Environment Configuration
- Backend requires `dev.env` file with Supabase connection parameters
- Frontend uses Vite environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- Docker Compose manages service orchestration

### Testing
- Python tests located in `tests/` directory
- API tests for user and organization creation
- No frontend test framework currently configured