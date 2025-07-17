import axios from 'axios';
const baseURL = 'http://localhost:3000/';
//const baseURL = import.meta.env.VITE_API_URL;

export const client = axios.create({
  baseURL,
});

client.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
