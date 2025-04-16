import express from 'express';
import cors from 'cors';
import redis from './redis';
import authRegister from './routes/auth/registerRoutes';
import authLogin from './routes/auth/loginRoutes';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use('/auth', authRegister, authLogin)

app.get('/messages', async (req, res) => {
  const messages = await redis.lrange('chat:messages', 0, -1);
  res.json(messages.reverse());
});

export default app;