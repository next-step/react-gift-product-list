import axios from 'axios';
import type { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/api/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,

  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      type ErrorResponseData = { data?: { status?: string } };
      const statusMsg = (error.response?.data as ErrorResponseData)?.data?.status ?? '에러 발생';
      return Promise.reject(new Error(statusMsg));
    }
    return Promise.reject(error);
  },
);

export default apiClient;
