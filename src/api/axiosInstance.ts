import { SESSION_USER_INFO_KEY } from "@/constants/storageKeys";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  config => {
    const sessionUserInfo = sessionStorage.getItem(SESSION_USER_INFO_KEY);
    if (sessionUserInfo) {
      const { authToken } = JSON.parse(sessionUserInfo);
      config.headers.Authorization = authToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response.data?.data ?? response.data;
  },
  error => {
    return Promise.reject({
      ...error,
      errorStatus: error.response?.status,
      errorMessage: error.response?.data?.data?.message,
    });
  },
);

export default axiosInstance;
