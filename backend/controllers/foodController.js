import Category from '../models/Category.js';
import FoodItem from '../models/FoodItem.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

const SORT_MAP = {
  featured: { 'ratings.average': -1, createdAt: -1 },
  newest: { createdAt: -1 },
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  rating_desc: { 'ratings.average': -1, 'ratings.count': -1 },
  name_asc: { name: 1 },
};

const buildFoodFilter = (params = {}) => {
  const filter = { isAvailable: true };

  if (params.category) {
    filter.category = params.category;
  }

  const keyword = params.search || params.q;
  if (keyword) {
    filter.$or = [
      { name: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ];
  }

  return filter;
};

const fetchFoodList = async ({ category, q, search, page = 1, limit = 9, sort = 'featured' }) => {
  const parsedPage = Number(page) || 1;
  const parsedLimit = Number(limit) || 9;
  const filter = buildFoodFilter({ category, q, search });
  const sortConfig = SORT_MAP[sort] || SORT_MAP.featured;

  const [foods, totalItems] = await Promise.all([
    FoodItem.find(filter)
      .populate('category', 'name image')
      .sort(sortConfig)
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit)
      .lean(),
    FoodItem.countDocuments(filter),
  ]);

  return {
    foods,
    pagination: {
      currentPage: parsedPage,
      totalPages: Math.max(1, Math.ceil(totalItems / parsedLimit)),
      totalItems,
      pageSize: parsedLimit,
    },
  };
};

export const getFoods = asyncHandler(async (req, res) => {
  const result = await fetchFoodList(req.query);
  res.status(200).json(result);
});

export const getFoodById = asyncHandler(async (req, res) => {
  const food = await FoodItem.findById(req.params.id).populate('category', 'name image').lean();

  if (!food) {
    throw new AppError('Food item not found.', 404);
  }

  res.status(200).json({ food });
});

export const getFoodsByCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.categoryId).lean();

  if (!category) {
    throw new AppError('Category not found.', 404);
  }

  const result = await fetchFoodList({
    ...req.query,
    category: req.params.categoryId,
  });

  res.status(200).json({
    category,
    ...result,
  });
});

export const searchFoods = asyncHandler(async (req, res) => {
  const result = await fetchFoodList({
    ...req.query,
    q: req.query.q,
    page: req.query.page || 1,
    limit: req.query.limit || 12,
  });

  res.status(200).json(result);
});

