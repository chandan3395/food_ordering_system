import FoodItem from '../models/FoodItem.js';
import Order from '../models/Order.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

const normalizeItems = (items) => {
  const mergedItems = new Map();

  for (const item of items) {
    const existing = mergedItems.get(item.foodItem) || 0;
    mergedItems.set(item.foodItem, existing + Number(item.quantity));
  }

  return [...mergedItems.entries()].map(([foodItem, quantity]) => ({ foodItem, quantity }));
};

export const createOrder = asyncHandler(async (req, res) => {
  const normalizedItems = normalizeItems(req.body.items);

  if (normalizedItems.length === 0) {
    throw new AppError('Order must contain at least one item.', 400);
  }

  const foodIds = normalizedItems.map((item) => item.foodItem);
  const foodItems = await FoodItem.find({
    _id: { $in: foodIds },
    isAvailable: true,
  });

  if (foodItems.length !== foodIds.length) {
    throw new AppError('One or more food items are unavailable.', 400);
  }

  const foodMap = new Map(foodItems.map((food) => [food._id.toString(), food]));
  const orderItems = [];
  let subtotalAmount = 0;

  for (const requestItem of normalizedItems) {
    const food = foodMap.get(requestItem.foodItem);

    if (!food) {
      throw new AppError('One or more food items could not be found.', 404);
    }

    if (requestItem.quantity < 1 || requestItem.quantity > 20) {
      throw new AppError('Quantity must be between 1 and 20.', 400);
    }

    if (food.stock < requestItem.quantity) {
      throw new AppError(`Only ${food.stock} portions of ${food.name} are available right now.`, 400);
    }

    const subtotal = Number((food.price * requestItem.quantity).toFixed(2));

    orderItems.push({
      foodItem: food._id,
      quantity: requestItem.quantity,
      unitPrice: food.price,
      subtotal,
    });

    subtotalAmount += subtotal;
  }

  const deliveryFee = orderItems.length > 0 ? 49 : 0;
  const tax = Math.round(subtotalAmount * 0.05);
  const totalAmount = Number((subtotalAmount + deliveryFee + tax).toFixed(2));

  await FoodItem.bulkWrite(
    normalizedItems.map((requestItem) => {
      const food = foodMap.get(requestItem.foodItem);
      const nextStock = food.stock - requestItem.quantity;

      return {
        updateOne: {
          filter: { _id: food._id },
          update: {
            $set: {
              stock: nextStock,
              isAvailable: nextStock > 0,
            },
          },
        },
      };
    }),
  );

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    totalAmount,
    deliveryAddress: {
      fullName: req.body.deliveryAddress.fullName,
      phone: req.body.deliveryAddress.phone,
      street: req.body.deliveryAddress.street,
      city: req.body.deliveryAddress.city,
      state: req.body.deliveryAddress.state,
      postalCode: req.body.deliveryAddress.postalCode,
      country: req.body.deliveryAddress.country || 'India',
      notes: req.body.deliveryAddress.notes || '',
    },
  });

  const populatedOrder = await Order.findById(order._id)
    .populate('items.foodItem', 'name image category')
    .populate('user', 'name email phone')
    .lean();

  res.status(201).json({
    message: 'Order placed successfully.',
    order: populatedOrder,
  });
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate('items.foodItem', 'name image category')
    .lean();

  res.status(200).json({ orders });
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('items.foodItem', 'name image category')
    .populate('user', 'name email phone')
    .lean();

  if (!order) {
    throw new AppError('Order not found.', 404);
  }

  if (order.user._id.toString() !== req.user._id.toString()) {
    throw new AppError('You are not authorized to view this order.', 403);
  }

  res.status(200).json({ order });
});
