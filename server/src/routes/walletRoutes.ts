import express, { Router } from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { createWallet } from '../controllers/walletController.js';

const router: Router = express.Router();

router.use(isAuthenticated);

router.post('/', createWallet);

export default router;
