import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import sanitizeUser from '../utils/sanitizeUser.js';

const getAuthCookieOptions = () => ({
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
});

const setAuthCookie = (res, userId) => {
  const token = generateToken(userId);
  res.cookie('token', token, getAuthCookieOptions());
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone = '' } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('An account with this email already exists.', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
  });

  setAuthCookie(res, user._id);

  res.status(201).json({
    message: 'Account created successfully.',
    user: sanitizeUser(user),
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError('Invalid email or password.', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError('Invalid email or password.', 401);
  }

  setAuthCookie(res, user._id);

  res.status(200).json({
    message: 'Logged in successfully.',
    user: sanitizeUser(user),
  });
});

export const logoutUser = asyncHandler(async (_req, res) => {
  res.clearCookie('token', getAuthCookieOptions());
  res.status(200).json({ message: 'Logged out successfully.' });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    user: sanitizeUser(req.user),
  });
});
