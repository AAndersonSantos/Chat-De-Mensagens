import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app';
import { setupWebSocket } from './socket';
import dotenv from "dotenv";

dotenv.config();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  },
});

setupWebSocket(io);

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
  console.log(`Servidor WebSocket rodando na porta ${PORT}`);
});