import { Router } from 'express';
import { resumeController } from '../controllers/resume.controller.js';
import { authenticateAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Public
router.get('/active', resumeController.getActive);
router.post('/track-download', resumeController.trackDownload);

// Admin
router.get('/all', authenticateAdmin, resumeController.getAll);
router.post('/upload', authenticateAdmin, resumeController.create);
router.patch('/:id/activate', authenticateAdmin, resumeController.setActive);

export default router;
