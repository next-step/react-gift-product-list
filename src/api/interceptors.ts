import { type AxiosInstance, AxiosError } from "axios";
import { HTTP_STATUS } from "@/constants/httpStatus";
import { ERROR_MESSAGES } from "@/constants/messages";

interface ErrorResponseBody {
  data: {
    status: string;
    statusCode: number;
    message: string;
  };
}

export const attachInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response.data?.data,

    (error: AxiosError<ErrorResponseBody>) => {
      const status = error.response?.status;
      const message = error.response?.data?.data?.message;

      if (status === HTTP_STATUS.UNAUTHORIZED) {
        window.location.href = "/login";
      }

      return Promise.reject(message || ERROR_MESSAGES.SYSTEM.UNKNOWN);
    },
  );
};
