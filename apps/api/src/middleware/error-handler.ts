import type { ErrorRequestHandler } from 'express';
import { env } from '../config/env.js';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode =
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    typeof error.statusCode === 'number'
      ? error.statusCode
      : 500;

  const message =
    statusCode >= 500 && env.NODE_ENV === 'production'
      ? 'An unexpected server error occurred.'
      : error instanceof Error
        ? error.message
        : 'An unexpected server error occurred.';

  res.status(statusCode).json({
    success: false,
    error: { code: statusCode >= 500 ? 'INTERNAL_SERVER_ERROR' : 'REQUEST_ERROR', message },
  });
};
