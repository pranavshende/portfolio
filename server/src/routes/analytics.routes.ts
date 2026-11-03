import { Router } from 'express';
import { analyticsController } from '../controllers/analytics.controller.js';
import { authenticateAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Public: Event tracking
router.post('/event', analyticsController.recordEvent);

// Admin: Overview dashboard (support both /dashboard and /overview aliases)
router.get('/overview', authenticateAdmin, analyticsController.getOverview);
router.get('/dashboard', authenticateAdmin, analyticsController.getOverview);

export default router;
