import express, { Router } from 'express';
import {
  login,
  logoutUser,
  getAuthStatus,
} from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router: Router = express.Router();

router.post('/login', login);

router.post('/logout', isAuthenticated, logoutUser);

router.get('/status', isAuthenticated, getAuthStatus);

export default router;
