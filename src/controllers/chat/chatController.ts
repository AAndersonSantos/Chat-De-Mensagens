import { Request, Response } from 'express';
import redis from '../../redis';
import { RequestWithUserId } from '../../types/authMiddlewareTypes';

export const chat = async (req: Request, res: Response): Promise<void> => {
    try {
        const messages = await redis.lrange('chat:messages', 0, -1);
        const reversedMessages = [...messages].reverse();
        
        res.status(200).json({
            success: true,
            messages: reversedMessages
        });
        
    } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao carregar mensagens'
        });
    }
}