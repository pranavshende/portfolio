import { Router } from 'express';
import { projectController, createProjectSchema } from '../controllers/project.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { authenticateAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Public
router.get('/', projectController.getAll);
router.get('/stats', projectController.getStats);
router.post('/stats', projectController.recordStats);
router.get('/:slug', projectController.getBySlug);

// Admin Only
router.get('/admin/all', authenticateAdmin, projectController.adminGetAll);
router.post('/', authenticateAdmin, validate(createProjectSchema), projectController.create);
router.put('/:id', authenticateAdmin, validate(createProjectSchema), projectController.update);
router.delete('/:id', authenticateAdmin, projectController.delete);
router.patch('/admin/reorder', authenticateAdmin, projectController.reorder);

export default router;
