import express, { Router } from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import {
  createWallet,
  getWallets,
  getWalletById,
  updateWallet,
  deleteWallet,
} from '../controllers/walletController.js';

const router: Router = express.Router();

router.use(isAuthenticated);

router.post('/', createWallet);
router.get('/', getWallets);
router.get('/:id', getWalletById);
router.put('/:id', updateWallet);
router.delete('/:id', deleteWallet);

export default router;
