import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RequestWithUserId, UserJwtPayload } from '../types/authMiddlewareTypes'

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        res.status(401).json({ 
        success: false,
        message: 'Token de autenticação não fornecido' 
      });

      return;
    }

    const [bearer, token] = authHeader.split(' ');
    
    if (bearer !== 'Bearer' || !token) {
        res.status(401).json({ 
        success: false,
        message: 'Formato de token inválido' 
      });
      
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as UserJwtPayload;
    (req as RequestWithUserId).userId = decoded.userId;
    
    next();
    
  } catch (error) {
    console.error('Erro na autenticação:', error);
    
    if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ success: false, message: 'Token expirado' });
        return
    }
    
    if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ success: false, message: 'Token inválido' });
        return;
    }

      res.status(500).json({ 
      success: false,
      message: 'Erro durante a autenticação' 

    });

  }
};