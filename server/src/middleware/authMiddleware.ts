import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.status(401).json({ error: 'Não autorizado. Por favor, faça login.' });
  return;
};
