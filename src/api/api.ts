import { ApiError, NetworkError, UnauthorizedError } from "@/api/custom-error";
import { API_ERROR_MESSAGE } from "@/constants";
import { getUserInfo } from "@/utils";
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
    if (!error.response) throw new NetworkError();

    const { status, data } = error.response;

    if (status === 401) {
      throw new UnauthorizedError();
    }
    const errorMessage =
      data?.message || data?.data?.message || API_ERROR_MESSAGE.DEFAULT;
    throw new ApiError(errorMessage, status);
  },
);
