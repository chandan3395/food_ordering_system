import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    } else if (error.code === 'ECONNABORTED') {
      error.message = 'The request timed out. Please try again.';
    } else if (!error.response) {
      error.message = 'Unable to reach the server. Please check your connection.';
    }

    return Promise.reject(error);
  },
);

export default api;

