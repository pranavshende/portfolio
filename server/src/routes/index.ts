import { Router } from 'express';
import authRoutes from './auth.routes.js';
import contactRoutes from './contact.routes.js';
import projectRoutes from './project.routes.js';
import analyticsRoutes from './analytics.routes.js';
import resumeRoutes from './resume.routes.js';
import contentRoutes from './content.routes.js';
import aiRoutes from './ai.routes.js';

import { prisma } from '../config/prisma.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/projects', projectRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/resume', resumeRoutes);
router.use('/content', contentRoutes);
router.use('/ai', aiRoutes);

// Health check endpoint for Uptime monitoring & Render warmup
router.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRawUnsafe('SELECT 1');
    res.status(200).json({
      status: 'healthy',
      server: 'operational',
      database: 'connected',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(200).json({
      status: 'degraded',
      server: 'operational',
      database: 'reconnecting',
      error: error.message,
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
