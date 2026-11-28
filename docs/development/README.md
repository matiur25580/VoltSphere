# Local development

## Prerequisites

- Node.js 22 or newer
- npm 10 or newer
- Docker Desktop (optional, for the full local stack)

## Install

```bash
npm install
cp .env.example .env
```

## Run with Docker

```bash
docker compose up --build
```

- Web: http://localhost:5173
- API: http://localhost:4000/api/v1
- Health: http://localhost:4000/api/v1/health

## Run without Docker

Start MongoDB locally, then run:

```bash
npm run dev
```

## Quality checks

```bash
npm run lint
npm test
npm run build
npm run format:check
```
