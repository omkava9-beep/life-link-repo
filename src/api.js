import axios from 'axios';

// The base URL for your backend server
const API_URL = 'https://life-link-backend-wbnf.onrender.com';

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
