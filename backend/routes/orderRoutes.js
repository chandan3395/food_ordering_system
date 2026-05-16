import { Router } from 'express';

import {
  createOrder,
  getMyOrders,
  getOrderById,
} from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import validateMiddleware from '../middleware/validateMiddleware.js';
import { orderCreateValidator, orderIdParamValidator } from '../utils/validators.js';

const router = Router();

router.use(authMiddleware);
router.post('/', orderCreateValidator, validateMiddleware, createOrder);
router.get('/my-orders', getMyOrders);
router.get('/:id', orderIdParamValidator, validateMiddleware, getOrderById);

export default router;

