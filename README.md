# VoltSphere

**Enterprise Energy Intelligence & Optimization Platform**

VoltSphere is a MERN-based enterprise SaaS platform designed to help organizations understand energy consumption, manage facilities and energy assets, analyze operational costs, and make evidence-based efficiency decisions.

> **Project status:** Milestone 1 — Enterprise Foundation (in progress).

## Product vision

Organizations with multiple sites often manage meter readings, energy assets, tariffs, maintenance, and sustainability data across disconnected tools. VoltSphere aims to bring these operational signals into one tenant-aware workspace.

The long-term product roadmap includes:

- Multi-organization and multi-facility management
- Smart meter registry and IoT telemetry ingestion
- Energy consumption and cost analytics
- Configurable tariff and billing calculations
- Consumption anomaly detection and demand forecasting
- Renewable generation and carbon accounting
- Energy optimization scenario planning
- Maintenance and approval workflows
- Auditable enterprise administration

Only functionality present in the repository should be considered implemented. Forecasting, AI, hardware connectivity, and optimization capabilities are roadmap items until delivered and tested.

## Technology

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB, Mongoose
- **Security foundation:** Helmet, CORS allowlist, rate limiting, request-size limits
- **Validation:** Zod
- **Testing:** Vitest, Supertest
- **Tooling:** npm workspaces, ESLint, Prettier
- **Delivery:** Docker, Docker Compose, GitHub Actions

## Repository structure

```text
apps/
  api/                 Express REST API
  web/                 React application
docs/
  architecture/        Architecture decisions and boundaries
  development/         Local setup and workflows
.github/workflows/     Continuous integration
docker-compose.yml
```

## Getting started

Requirements: Node.js 22+, npm 10+, and MongoDB (or Docker).

```bash
npm install
cp .env.example .env
npm run dev
```

For the containerized stack:

```bash
docker compose up --build
```

- Web application: http://localhost:5173
- API base: http://localhost:4000/api/v1
- Health check: http://localhost:4000/api/v1/health

## Quality checks

```bash
npm run lint
npm test
npm run build
npm run format:check
```

## Engineering principles

1. Tenant ownership must be derived from authenticated server-side identity, never trusted from request payloads.
2. Every tenant-owned read and write must be scoped and tested.
3. Meter ingestion must be validated, timestamp-aware, and idempotent.
4. Forecasts and simulations must be labelled separately from measured data.
5. Material business actions must produce auditable events.
6. Integrations must use explicit adapters and documented trust boundaries.

## Roadmap

See [architecture notes](docs/architecture/README.md) and [development guide](docs/development/README.md). The implementation will progress through independently reviewable milestones.

## License

No license has been selected yet. All rights are reserved unless a license is added.
