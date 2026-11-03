import { Router } from 'express';
import { aiController } from '../controllers/ai.controller.js';

const router = Router();

// Public: AI Chatbot RAG query
router.post('/chat', aiController.chat);

export default router;
