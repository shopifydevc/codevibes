// ============================================================
// Error Handler Middleware
// ============================================================

import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

export interface AppError extends Error {
    statusCode?: number;
    code?: string;
}

/**
 * Global error handler middleware
 */
export function errorHandler(
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    logger.error('Unhandled error', {
        error: message,
        stack: err.stack,
        code: err.code,
    });

    res.status(statusCode).json({
        error: message,
        code: err.code,
    });
}

/**
 * 404 handler for unknown routes
 */
export function notFoundHandler(req: Request, res: Response): void {
    res.status(404).json({
        error: `Route not found: ${req.method} ${req.path}`,
    });
}
