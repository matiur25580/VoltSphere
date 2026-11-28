import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { env } from './config/env.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFoundHandler } from './middleware/not-found.js';
import { healthRouter } from './routes/health.routes.js';

export const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// pino-http exposes a callable CommonJS export; normalize its type for NodeNext ESM.
const createHttpLogger = pinoHttp as unknown as (options: {
  redact: string[];
}) => express.RequestHandler;
app.use(createHttpLogger({ redact: ['req.headers.authorization', 'req.headers.cookie'] }));

app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  }),
);

app.get('/api/v1', (_req, res) => {
  res.json({ success: true, data: { name: 'VoltSphere API', version: 'v1' } });
});
app.use('/api/v1/health', healthRouter);
app.use(notFoundHandler);
app.use(errorHandler);
