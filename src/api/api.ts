import { getUserInfo, showToast } from "@/utils";
import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  config => {
    const userInfo = getUserInfo();
    if (userInfo?.authToken) {
      config.headers.Authorization = userInfo.authToken;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response?.status === 401) {
      const authErrorMessage = "로그인이 필요합니다.";

      showToast.error(authErrorMessage);

      const customError = new Error(authErrorMessage);
      customError.name = "AuthenticationError";
      return Promise.reject(customError);
    }

    return Promise.reject(error);
  },
);
