import { Server } from 'socket.io';
import redis from './redis';

export const setupWebSocket = (io: Server) => {

  io.on('connection', (socket) => {
    console.log('Usuário conectado:', socket.id);

    socket.on('message', async (message: string) => {
      console.log('Mensagem recebida:', message);

      await redis.lpush('chat:messages', message);
      await redis.ltrim('chat:messages', 0, 99);

      io.emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log('Usuário desconectado:', socket.id);
    });
  });

};