import { config } from '@/utils/config';
import { userInfoStorage } from '@/utils/storage';
import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import axios from 'axios';

const initInstance = (config: CreateAxiosDefaults): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000, // 5 seconds
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
    ...config,
  });

  instance.interceptors.request.use((config) => {
    const authToken = userInfoStorage.get()?.authToken;
    if (authToken) {
      config.headers.Authorization = authToken;
    }
    return config;
  });

  return instance;
};

export const apiInstance = initInstance({
  baseURL: config.apiBaseUrl,
});
