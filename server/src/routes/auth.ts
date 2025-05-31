import express, { Router } from 'express';
import { login, logoutUser } from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router: Router = express.Router();

router.post('/login', login);

router.post('/logout', isAuthenticated, logoutUser);

export default router;
