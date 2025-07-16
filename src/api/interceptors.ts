import { type AxiosInstance } from "axios";

export const attachInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response.data?.data,
    (error) => {
      const res = error.response?.data?.data;
      return Promise.reject(res ?? error);
    },
  );
};
