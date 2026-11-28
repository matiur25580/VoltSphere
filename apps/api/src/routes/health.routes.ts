import { Router } from 'express';
import mongoose from 'mongoose';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  const databaseState = mongoose.connection.readyState;
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      service: 'voltsphere-api',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      dependencies: {
        mongodb: databaseState === 1 ? 'connected' : 'disconnected',
      },
    },
  });
});
