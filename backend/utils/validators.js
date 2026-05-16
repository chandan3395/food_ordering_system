import { body, param, query } from 'express-validator';

const phonePattern = /^[+]?[\d\s()-]{7,20}$/;

export const registerValidator = [
  body('name').trim().isLength({ min: 2, max: 60 }).withMessage('Name must be between 2 and 60 characters.'),
  body('email').trim().isEmail().withMessage('Please provide a valid email address.').normalizeEmail(),
  body('password')
    .isLength({ min: 6, max: 64 })
    .withMessage('Password must be between 6 and 64 characters.'),
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(phonePattern)
    .withMessage('Please provide a valid phone number.'),
];

export const loginValidator = [
  body('email').trim().isEmail().withMessage('Please provide a valid email address.').normalizeEmail(),
  body('password').isLength({ min: 6, max: 64 }).withMessage('Password must be between 6 and 64 characters.'),
];

export const foodListValidator = [
  query('page').optional().isInt({ min: 1, max: 100 }).withMessage('Page must be a positive integer.'),
  query('limit').optional().isInt({ min: 1, max: 24 }).withMessage('Limit must be between 1 and 24.'),
  query('category').optional().isMongoId().withMessage('Category filter must be a valid identifier.'),
  query('sort')
    .optional()
    .isIn(['featured', 'newest', 'price_asc', 'price_desc', 'rating_desc', 'name_asc'])
    .withMessage('Sort value is invalid.'),
  query('search').optional().trim().isLength({ max: 80 }).withMessage('Search term is too long.'),
];

export const searchValidator = [
  query('q')
    .trim()
    .isLength({ min: 1, max: 80 })
    .withMessage('Search query must be between 1 and 80 characters.'),
  query('page').optional().isInt({ min: 1, max: 100 }).withMessage('Page must be a positive integer.'),
  query('limit').optional().isInt({ min: 1, max: 24 }).withMessage('Limit must be between 1 and 24.'),
  query('sort')
    .optional()
    .isIn(['featured', 'newest', 'price_asc', 'price_desc', 'rating_desc', 'name_asc'])
    .withMessage('Sort value is invalid.'),
];

export const foodIdParamValidator = [
  param('id').isMongoId().withMessage('Food item identifier is invalid.'),
];

export const categoryIdParamValidator = [
  param('categoryId').isMongoId().withMessage('Category identifier is invalid.'),
];

export const orderIdParamValidator = [
  param('id').isMongoId().withMessage('Order identifier is invalid.'),
];

export const orderCreateValidator = [
  body('items').isArray({ min: 1, max: 20 }).withMessage('Order must contain between 1 and 20 items.'),
  body('items.*.foodItem').isMongoId().withMessage('Every order item must reference a valid food item.'),
  body('items.*.quantity').isInt({ min: 1, max: 20 }).withMessage('Each quantity must be between 1 and 20.'),
  body('deliveryAddress.fullName')
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage('Delivery name must be between 2 and 80 characters.'),
  body('deliveryAddress.phone')
    .trim()
    .matches(phonePattern)
    .withMessage('Delivery phone number is invalid.'),
  body('deliveryAddress.street')
    .trim()
    .isLength({ min: 5, max: 120 })
    .withMessage('Street address must be between 5 and 120 characters.'),
  body('deliveryAddress.city')
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage('City must be between 2 and 60 characters.'),
  body('deliveryAddress.state')
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage('State must be between 2 and 60 characters.'),
  body('deliveryAddress.postalCode')
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage('Postal code must be between 3 and 12 characters.'),
  body('deliveryAddress.country')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage('Country must be between 2 and 60 characters.'),
  body('deliveryAddress.notes')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 180 })
    .withMessage('Notes must be 180 characters or fewer.'),
];
