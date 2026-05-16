import api from './api';

export const fetchFoods = async (params = {}) => {
  const { data } = await api.get('/foods', { params });
  return data;
};

export const fetchFoodById = async (id) => {
  const { data } = await api.get(`/foods/${id}`);
  return data;
};

export const fetchFoodsByCategory = async (categoryId, params = {}) => {
  const { data } = await api.get(`/foods/category/${categoryId}`, { params });
  return data;
};

export const searchFoods = async (query, params = {}) => {
  const { data } = await api.get('/foods/search', {
    params: {
      q: query,
      ...params,
    },
  });
  return data;
};

