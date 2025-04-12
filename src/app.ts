import express from 'express';
import cors from 'cors';
import redis from './redis';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/messages', async (req, res) => {
  const messages = await redis.lrange('chat:messages', 0, -1);
  res.json(messages.reverse());
});

export default app;