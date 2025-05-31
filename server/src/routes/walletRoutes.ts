import express, { Router } from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { createWallet, getWallets } from '../controllers/walletController.js';

const router: Router = express.Router();

router.use(isAuthenticated);

router.post('/', createWallet);
router.get('/', getWallets);

export default router;
