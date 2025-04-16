import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app';
import { setupWebSocket } from './socket';

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"], // Adicione OPTIONS
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  },
});

setupWebSocket(io);

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log('Servidor WebSocket rodando na porta 3001');
});