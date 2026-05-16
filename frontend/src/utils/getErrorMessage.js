export const getErrorMessage = (error, fallback = 'Something went wrong. Please try again.') =>
  error?.message || fallback;

