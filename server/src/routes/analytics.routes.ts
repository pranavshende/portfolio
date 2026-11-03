import { Router } from 'express';
import { analyticsController } from '../controllers/analytics.controller.js';
import { authenticateAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Public: Event tracking
router.post('/event', analyticsController.recordEvent);

// Admin: Overview dashboard
router.get('/overview', authenticateAdmin, analyticsController.getOverview);

export default router;
