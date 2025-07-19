import axios from 'axios';
import { USER_INFO_KEY } from '@/contexts/storageKeys';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const storedUserInfo = localStorage.getItem(USER_INFO_KEY);
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      if (userInfo.authToken) {
        if (userInfo.authToken === 'dummy-token') {
          config.headers.Authorization = userInfo.authToken;
        } else {
          config.headers.Authorization = `Bearer ${userInfo.authToken}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(USER_INFO_KEY);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
