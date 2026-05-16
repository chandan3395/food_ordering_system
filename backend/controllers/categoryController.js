import Category from '../models/Category.js';
import FoodItem from '../models/FoodItem.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getCategories = asyncHandler(async (_req, res) => {
  const [categories, itemCounts] = await Promise.all([
    Category.find({}).sort({ name: 1 }).lean(),
    FoodItem.aggregate([
      { $match: { isAvailable: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]),
  ]);

  const countsByCategoryId = itemCounts.reduce((accumulator, item) => {
    accumulator[item._id.toString()] = item.count;
    return accumulator;
  }, {});

  const formattedCategories = categories.map((category) => ({
    ...category,
    itemCount: countsByCategoryId[category._id.toString()] || 0,
  }));

  res.status(200).json({ categories: formattedCategories });
});

