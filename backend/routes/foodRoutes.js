import { Router } from 'express';

import {
  getFoodById,
  getFoods,
  getFoodsByCategory,
  searchFoods,
} from '../controllers/foodController.js';
import validateMiddleware from '../middleware/validateMiddleware.js';
import {
  categoryIdParamValidator,
  foodIdParamValidator,
  foodListValidator,
  searchValidator,
} from '../utils/validators.js';

const router = Router();

router.get('/', foodListValidator, validateMiddleware, getFoods);
router.get('/search', searchValidator, validateMiddleware, searchFoods);
router.get('/category/:categoryId', categoryIdParamValidator, validateMiddleware, getFoodsByCategory);
router.get('/:id', foodIdParamValidator, validateMiddleware, getFoodById);

export default router;

