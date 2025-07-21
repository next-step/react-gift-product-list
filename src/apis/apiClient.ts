import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { LoginInfoContext } from '@/contexts/LoginInfoContext';

const BASE_URL = 'http://localhost:3000/api/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function useAccessToken() {
  const { userInfo } = useContext(LoginInfoContext);
  return userInfo.authToken;
}

apiClient.interceptors.request.use(
  (config) => {
    const token = useAccessToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
