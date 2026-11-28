import { app } from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { env } from './config/env.js';

async function start(): Promise<void> {
  try {
    await connectDatabase();
    const server = app.listen(env.PORT, () => {
      console.info(`VoltSphere API listening on port ${env.PORT}`);
    });

    const shutdown = (signal: string) => {
      console.info(`${signal} received; shutting down gracefully`);
      server.close(async () => {
        await disconnectDatabase();
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('Failed to start VoltSphere API:', error);
    process.exit(1);
  }
}

void start();
