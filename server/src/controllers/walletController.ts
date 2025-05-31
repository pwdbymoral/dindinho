import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prismaClient.js';

declare module 'express-session' {
  interface SessionData {
    userId?: number;
    username?: string;
  }
}

interface CreateWalletBody {
  name: string;
  type: string;
  initial_balance?: number; // Torna initial_balance opcional no corpo da requisição
}

export const createWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, type, initial_balance }: CreateWalletBody = req.body;
    const userIdFromSession = req.session.userId;

    if (userIdFromSession === undefined) {
      console.error(
        '[createWallet] Erro: userId não encontrado na sessão, mesmo após isAuthenticated.'
      );
      return res.status(500).json({
        message: 'Erro interno: ID do usuário não encontrado na sessão.',
      });
    }

    if (!name || !type) {
      return res
        .status(400)
        .json({ message: 'Nome e tipo da carteira são obrigatórios.' });
    }
    if (
      initial_balance !== undefined &&
      (typeof initial_balance !== 'number' || isNaN(initial_balance))
    ) {
      return res
        .status(400)
        .json({ message: 'Saldo inicial deve ser um número válido.' });
    }

    const walletData: {
      name: string;
      type: string;
      initial_balance?: number; // Opcional aqui também
      userId: number; // Agora userIdFromSession é garantidamente um número
    } = {
      name,
      type,
      userId: userIdFromSession, // Passando o userId que sabemos ser um número
    };

    if (initial_balance !== undefined) {
      walletData.initial_balance = initial_balance; // Se initial_balance for definido, adiciona-o ao objeto
    }

    const newWallet = await prisma.wallet.create({
      data: walletData,
    });
    return res.status(201).json(newWallet);
  } catch (error) {
    next(error);
  }
};

export const getWallets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }
    const wallets = await prisma.wallet.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return res.status(200).json(wallets);
  } catch (error) {
    next(error);
  }
};
// TODO: Implementar getWalletById
// TODO: Implementar updateWallet
// TODO: Implementar deleteWallet
