import express, { Request, Response, NextFunction, Router } from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router: Router = express.Router();

// GET home page
router.get(
  '/',
  isAuthenticated,
  (_req: Request, res: Response, _next: NextFunction) => {
    res.send('respondendo com um recurso de usuários!');
  }
);

export default router;
