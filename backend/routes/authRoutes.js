import { Router } from 'express';

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import validateMiddleware from '../middleware/validateMiddleware.js';
import { loginValidator, registerValidator } from '../utils/validators.js';

const router = Router();

router.post('/register', registerValidator, validateMiddleware, registerUser);
router.post('/login', loginValidator, validateMiddleware, loginUser);
router.post('/logout', logoutUser);
router.get('/me', authMiddleware, getCurrentUser);

export default router;

