import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prismaClient.js';
import bcrypt from 'bcryptjs';

declare module 'express-session' {
  interface SessionData {
    userId?: number;
    username?: string;
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ message: 'Email/Usuário e senha são obrigatórios.' });
    }

    // 2. Encontrar o usuário no banco (pode ser por email ou username)
    let user = await prisma.user.findUnique({
      where: { email: emailOrUsername },
    });

    if (!user) {
      user = await prisma.user.findUnique({
        where: { username: emailOrUsername },
      });
    }

    // 3. Se usuário não encontrado, retornar erro
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' }); // Mensagem genérica por segurança
    }

    // 4. Comparar a senha fornecida com o hash armazenado usando bcrypt.compare()
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    // 5. Se senha incorreta, retornar erro
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // 6. Se tudo estiver OK, criar/popular a sessão
    // A sessão é criada/modificada automaticamente pelo middleware express-session
    // quando você atribui algo a req.session e a resposta é enviada.
    req.session.userId = user.id;
    req.session.username = user.username;

    // 7. Enviar resposta de sucesso
    return res.status(200).json({
      message: 'Login bem-sucedido',
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    // Encaminha o erro para o error handler do Express
    next(error);
  }
};

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao destruir a sessão:', err);
      return next(err);
    }
    res.clearCookie('connect.sid', { path: '/' });
    return res.status(200).json({ message: 'Logout realizado com sucesso.' });
  });
};
