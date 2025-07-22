import parseUserFromSessionStorage from '@/utils/parseUserFromSessionStorage';
import axios, { AxiosError, type AxiosInstance } from 'axios';
import handleError from './handleError';
import { STORAGE_KEY } from '@/contexts/UserInfoContext';

export interface ApiSuccess<T> {
  data: T;
  message?: string;
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  config => {
    if (config.url?.includes('/api/order')) {
      const token = parseUserFromSessionStorage(STORAGE_KEY).authToken;
      if (token) {
        config.headers.Authorization = `${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    handleError(error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => response.data.data,
  (error: AxiosError) => {
    handleError(error);
    return Promise.reject(error);
  }
);

export { apiClient };
