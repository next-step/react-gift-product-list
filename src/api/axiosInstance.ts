import { SESSION_USER_INFO_KEY } from "@/constants/storageKeys";
import axios from "axios";
import { toast } from "react-toastify";

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
    toast.error(error.response?.data?.data?.message || "다시 시도해주세요.");
    return Promise.reject(error);
  },
);

export default axiosInstance;
