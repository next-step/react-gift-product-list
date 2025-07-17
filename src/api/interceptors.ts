import { type AxiosInstance, AxiosError } from "axios";
import { HTTP_STATUS } from "@/constants/httpStatus";

import { ERROR_MESSAGES } from "@/constants/messages";

export const attachInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response.data?.data,

    (error: AxiosError<{ message?: string }>) => {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === HTTP_STATUS.UNAUTHORIZED) {
        window.location.href = "/login";
      }

      return Promise.reject(message || ERROR_MESSAGES.SYSTEM.UNKNOWN);
    },
  );
};
