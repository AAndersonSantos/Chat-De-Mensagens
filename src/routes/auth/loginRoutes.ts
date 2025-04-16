import express from 'express';
import { login } from '../../controllers/auth/loginController';

const router = express.Router();

router.post('/login', login);

export default router;