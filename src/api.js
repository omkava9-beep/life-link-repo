import axios from 'axios';

// Determine API URL based on environment
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_URL = isDevelopment
  ? 'https://life-link-frontend.onrender.com/api'
  : import.meta.env.VITE_API_URL || 'https://life-link-frontend.onrender.com/api';

console.log('API URL:', API_URL);

// Create an instance of axios
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to add the token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
