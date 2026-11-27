import { afterAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from './app.js';

afterAll(async () => {
  await mongoose.disconnect();
});

describe('API foundation', () => {
  it('returns API metadata', async () => {
    const response = await request(app).get('/api/v1');
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe('VoltSphere API');
  });

  it('exposes a health endpoint without requiring a database connection', async () => {
    const response = await request(app).get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe('ok');
    expect(response.body.data.dependencies.mongodb).toBe('disconnected');
  });

  it('returns a consistent 404 response', async () => {
    const response = await request(app).get('/api/v1/does-not-exist');
    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe('ROUTE_NOT_FOUND');
  });
});
