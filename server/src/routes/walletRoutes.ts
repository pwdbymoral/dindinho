import express, { Router } from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import {
  createWallet,
  getWallets,
  getWalletById,
} from '../controllers/walletController.js';

const router: Router = express.Router();

router.use(isAuthenticated);

router.post('/', createWallet);
router.get('/', getWallets);
router.get('/:id', getWalletById);

export default router;
