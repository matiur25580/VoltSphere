# Architecture

## Initial topology

- `apps/web`: React + TypeScript + Vite single-page application.
- `apps/api`: Express + TypeScript REST API.
- MongoDB: primary document database, accessed through Mongoose.
- Docker Compose: local orchestration for the web application, API, and MongoDB.

## API conventions

- Base path: `/api/v1`
- Success envelope: `{ success: true, data: ... }`
- Error envelope: `{ success: false, error: { code, message } }`
- Health endpoint: `GET /api/v1/health`

## Planned domain boundaries

The following are roadmap boundaries, not implemented capabilities yet:

1. Identity and tenant access
2. Organizations and facilities
3. Meter registry and telemetry ingestion
4. Energy analytics and tariff calculations
5. Forecasting and anomaly detection
6. Renewable generation and emissions
7. Optimization scenarios and operational workflows

Tenant isolation, authorization, and ingestion idempotency will be designed before domain endpoints expose tenant-owned data.
