# Hirion

AI-powered backend platform for developer hiring simulation and interview preparation.

## Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **Framework**: Fastify
- **Database**: PostgreSQL (Supabase) + Prisma
- **Queue**: BullMQ
- **Build System**: Turborepo
- **Linting**: Biome

## Project Structure

This is a monorepo managed by Turborepo:

```
hirion/
├── apps/
│   └── api/          # Fastify API application
├── packages/
│   ├── db/           # Prisma client and database schema
│   ├── shared/       # Shared schemas and utilities
│   ├── ai/           # AI orchestration (LangChain)
│   └── observability/ # Logging and tracing
└── package.json      # Root workspace configuration
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) >= 1.0.0
- Node.js >= 18.0.0
- PostgreSQL database (Supabase recommended)

### Installation

```bash
bun install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
SUPABASE_PROJECT_REF=...
SUPABASE_JWKS_URL=https://...
LANGSMITH_API_KEY=...
LANGSMITH_PROJECT=hirion
LANGSMITH_TRACING=true
OPENAI_API_KEY=...
```

### Development

```bash
# Run all apps in development mode
bun run dev

# Run specific app
bun --cwd apps/api dev

# Build all packages
bun run build

# Lint
bun run lint

# Type check
bun run typecheck
```

### Database

```bash
# Generate Prisma client
bun --cwd packages/db prisma:generate

# Run migrations
bun --cwd packages/db prisma:migrate

# Open Prisma Studio
bun --cwd packages/db prisma:studio
```

## Scripts

- `bun run dev` - Start all apps in development mode
- `bun run build` - Build all packages
- `bun run lint` - Lint all packages
- `bun run typecheck` - Type check all packages
- `bun run clean` - Clean all build outputs
