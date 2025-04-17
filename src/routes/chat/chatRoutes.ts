import express from 'express';
import { chat } from '../../controllers/chat/chatController';
import { authenticate } from '../../middlewares/authMiddleware';

const router = express.Router();

router.get('/messages', authenticate, chat);

export default router;