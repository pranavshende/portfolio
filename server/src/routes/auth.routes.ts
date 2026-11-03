import { Router } from 'express';
import { authController, loginSchema, updatePasswordSchema } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { authenticateAdmin } from '../middleware/auth.middleware.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/login', authRateLimiter, validate(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticateAdmin, authController.getMe);
router.post('/update-password', authenticateAdmin, validate(updatePasswordSchema), authController.updatePassword);

export default router;
