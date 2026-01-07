// ============================================================
// History Routes - Analysis history endpoints
// ============================================================

import { Router } from 'express';
import * as historyController from '../controllers/historyController.js';
import { requireAuth } from '../utils/auth.js';

const router = Router();

// All history routes require authentication
router.post('/', requireAuth, historyController.saveAnalysis);
router.get('/', requireAuth, historyController.getHistory);
router.get('/:id', requireAuth, historyController.getAnalysis);
router.delete('/:id', requireAuth, historyController.removeAnalysis);

export default router;
