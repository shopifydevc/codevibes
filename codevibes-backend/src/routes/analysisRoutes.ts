// ============================================================
// Analysis Routes - API route definitions
// ============================================================

import { Router } from 'express';
import * as analysisController from '../controllers/analysisController.js';
import { optionalAuth } from '../utils/auth.js';

const router = Router();

// Health check
router.get('/health', analysisController.health);

// Validate a GitHub repository (optionalAuth for private repos)
router.post('/validate-repo', optionalAuth, analysisController.validateRepo);

// Get cost estimate for a repository (optionalAuth for private repos)
router.get('/estimate', optionalAuth, analysisController.estimate);

// Run analysis with SSE streaming (optionalAuth to get user's GitHub token for private repos)
router.post('/analyze', optionalAuth, analysisController.analyze);

export default router;
