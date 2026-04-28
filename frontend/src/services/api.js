import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api'
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data) => API.post('/auth/signup', data),
  login: (data) => API.post('/auth/login', data),
  getProfile: () => API.get('/auth/profile')
};

export const restaurantAPI = {
  getAll: (params) => API.get('/restaurants', { params }),
  getById: (id) => API.get(`/restaurants/${id}`)
};

export const menuAPI = {
  getByRestaurant: (restaurantId, params) => API.get(`/menu/restaurant/${restaurantId}`, { params }),
  getItem: (id) => API.get(`/menu/item/${id}`)
};

export const orderAPI = {
  create: (data) => API.post('/orders', data),
  getUserOrders: () => API.get('/orders'),
  getById: (id) => API.get(`/orders/${id}`)
};

export const userAPI = {
  getAddresses: () => API.get('/users/addresses'),
  addAddress: (data) => API.post('/users/addresses', data),
  updateAddress: (id, data) => API.put(`/users/addresses/${id}`, data),
  deleteAddress: (id) => API.delete(`/users/addresses/${id}`)
};

export default API;
