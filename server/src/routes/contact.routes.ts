import { Router } from 'express';
import { contactController, createInquirySchema, updateStatusSchema } from '../controllers/contact.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { authenticateAdmin } from '../middleware/auth.middleware.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Public
router.post('/', contactRateLimiter, validate(createInquirySchema), contactController.submit);

// Admin Only
router.get('/', authenticateAdmin, contactController.getAll);
router.get('/export/csv', authenticateAdmin, contactController.exportCsv);
router.get('/:id', authenticateAdmin, contactController.getById);
router.patch('/:id/status', authenticateAdmin, validate(updateStatusSchema), contactController.updateStatus);
router.delete('/:id', authenticateAdmin, contactController.delete);

export default router;
