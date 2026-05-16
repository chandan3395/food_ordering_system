import Category from '../models/Category.js';
import FoodItem from '../models/FoodItem.js';
import { defaultCategories, defaultFoods } from '../data/defaultData.js';

const seedDefaults = async () => {
  const [categoryCount, foodCount] = await Promise.all([
    Category.countDocuments(),
    FoodItem.countDocuments(),
  ]);

  if (categoryCount === 0) {
    await Category.insertMany(defaultCategories);
  }

  if (foodCount === 0) {
    const categories = await Category.find({}).lean();
    const categoryMap = categories.reduce((accumulator, category) => {
      accumulator[category.name] = category._id;
      return accumulator;
    }, {});

    const foodDocuments = defaultFoods.map((food) => ({
      ...food,
      category: categoryMap[food.category],
    }));

    await FoodItem.insertMany(foodDocuments);
  }
};

export default seedDefaults;

