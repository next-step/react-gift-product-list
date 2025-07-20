import axios from 'axios';
import type { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/api/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function getAccessToken() {
  return localStorage.getItem('authToken');
}
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
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
