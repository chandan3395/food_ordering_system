import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

const extractToken = (req) => {
  const bearerToken = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null;

  return req.cookies.token || bearerToken || null;
};

export const authMiddleware = asyncHandler(async (req, _res, next) => {
  const token = extractToken(req);

  if (!token) {
    throw new AppError('Authentication required.', 401);
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new AppError('Session is invalid or has expired.', 401);
  }

  const user = await User.findById(decodedToken.userId);

  if (!user) {
    throw new AppError('User associated with this session no longer exists.', 401);
  }

  req.user = user;
  next();
});

