import express, { Router } from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router: Router = express.Router();

router.use(isAuthenticated);

export default router;
