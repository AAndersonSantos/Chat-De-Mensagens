import express from 'express';
import { chat } from '../../controllers/chat/chatController';

const router = express.Router();

router.get('/messages', chat);

export default router;