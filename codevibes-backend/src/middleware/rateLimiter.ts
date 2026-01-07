// ============================================================
// Rate Limiter Middleware
// ============================================================

import rateLimit from 'express-rate-limit';
import { logger } from '../utils/logger.js';

/**
 * Standard rate limiter - 100 requests per hour per IP
 */
export const standardLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100,
    message: {
        error: 'Too many requests. Please try again later.',
        code: 'RATE_LIMITED',
        retryAfter: '1 hour',
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, _next, options) => {
        logger.warn('Rate limit exceeded', { ip: req.ip, path: req.path });
        res.status(429).json(options.message);
    },
});

/**
 * Stricter rate limiter for analysis endpoint - 20 requests per hour
 */
export const analysisLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20,
    message: {
        error: 'Analysis rate limit exceeded. Please try again later.',
        code: 'ANALYSIS_RATE_LIMITED',
        retryAfter: '1 hour',
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, _next, options) => {
        logger.warn('Analysis rate limit exceeded', { ip: req.ip });
        res.status(429).json(options.message);
    },
});
