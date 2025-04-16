import { Request, Response } from 'express';
import { RegisterModel } from '../../models/auth/register.model';

export const register = async (req: Request, res: Response) : Promise<void> => {
  const { username, password } = req.body;

  if (!username?.trim() || !password?.trim()) {
    res.status(400).json({ success: false, message: "Usuário e senha são obrigatórios" });
    return;
  }

  if (password.length < 6) {
      res.status(400).json({ success: false, message: 'A senha deve ter pelo menos 6 caracteres' });
      return;
  }

  try {
    if (await RegisterModel.findByUsername(username)) {
        res.status(409).json({ success: false, message: 'Nome de usuário já existe!' });
        return;
    }

    const { id } = await RegisterModel.create(username, password);

    res.status(201).json({ success: true,
      message: 'Usuário criado com sucesso',
      userId: id
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao criar usuário' });
  }

};
