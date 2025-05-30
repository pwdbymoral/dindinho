import express, { Request, Response, NextFunction, Router } from 'express';

const router: Router = express.Router();

// GET home page
router.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.send('respondendo com um recurso de usuários!');
});

export default router;
