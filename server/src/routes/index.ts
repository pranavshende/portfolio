import { Router } from 'express';
import authRoutes from './auth.routes.js';
import contactRoutes from './contact.routes.js';
import projectRoutes from './project.routes.js';
import analyticsRoutes from './analytics.routes.js';
import resumeRoutes from './resume.routes.js';
import contentRoutes from './content.routes.js';
import aiRoutes from './ai.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/projects', projectRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/resume', resumeRoutes);
router.use('/content', contentRoutes);
router.use('/ai', aiRoutes);

// Health check
router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

export default router;
