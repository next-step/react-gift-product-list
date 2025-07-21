import { getStorageItem } from '@/utils/storage';
import axios from 'axios';
const baseURL = 'http://localhost:3000/';


export const client = axios.create({
  baseURL,
});

client.interceptors.request.use(
  (config) => {
    const token = getStorageItem('authToken');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
