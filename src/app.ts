import express from 'express';
import cors from 'cors';
import authRegister from './routes/auth/registerRoutes';
import authLogin from './routes/auth/loginRoutes';
import chat from './routes/chat/chatRoutes';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use('/auth', authRegister, authLogin)
app.use('/chat', chat)

export default app;