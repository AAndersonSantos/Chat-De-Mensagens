import { Request, Response } from 'express';
import { LoginModel } from '../../models/auth/login.model';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username?.trim() || !password?.trim()) {
    res.status(400).json({ success: false, message: "Usuário e senha são obrigatórios" });
    return;
  }

  try {
    const user = await LoginModel.validateCredentials(username, password);
    
    if (!user) {
      res.status(401).json({ 
        success: false, 
        message: 'Credenciais inválidas' 
      });

      return;
    }

    const getJwtSecret = (): string => {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
          throw new Error('JWT_SECRET não configurado');
        }

        return secret;
    }
      
    const token = jwt.sign({ userId: user.id }, getJwtSecret(), { expiresIn: '1h' });

    res.status(200).json({ 
      success: true,
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro durante o login',
    });
  }
};