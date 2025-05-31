import express, { Router, Request, Response, NextFunction } from 'express';

const router: Router = express.Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  res.status(501).json({ message: 'Endpoint de login ainda não implementado' });
});

export default router;
