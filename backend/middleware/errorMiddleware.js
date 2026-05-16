export const notFoundMiddleware = (req, _res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorMiddleware = (error, _req, res, _next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong on the server.';

  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((item) => item.message)
      .join(', ');
  }

  if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid resource identifier.';
  }

  if (error.code === 11000) {
    statusCode = 409;
    const fieldName = Object.keys(error.keyValue || {})[0] || 'field';
    message = `${fieldName} already exists.`;
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== 'production' && {
      stack: error.stack,
    }),
  });
};

