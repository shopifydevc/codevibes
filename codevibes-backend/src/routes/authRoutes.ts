// ============================================================
// Auth Routes - Authentication endpoints
// ============================================================

import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import * as reposController from '../controllers/reposController.js';
import { requireAuth } from '../utils/auth.js';

const router = Router();

// OAuth flow
router.get('/github', authController.redirectToGitHub);
router.get('/callback', authController.handleGitHubCallback);

// User endpoints
router.get('/me', requireAuth, authController.getCurrentUser);
router.post('/logout', authController.logout);

// Save DeepSeek API key
router.put('/deepseek-key', requireAuth, authController.saveDeepSeekKey);

// User repos
router.get('/repos', requireAuth, reposController.getUserRepos);

export default router;
