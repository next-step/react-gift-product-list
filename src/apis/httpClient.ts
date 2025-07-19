import axios, { isAxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (isAxiosError(err)) {
      if (err.response?.status === 401) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default apiClient;
