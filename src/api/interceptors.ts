import { type AxiosInstance, AxiosError } from "axios";
import { HttpStatusCode } from "axios";
import { ERROR_MESSAGES } from "@/constants/messages";
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorage";
import { navigate } from "@/lib/navigation";

interface ErrorResponseBody {
  data: {
    status: string;
    statusCode: number;
    message: string;
  };
}

export const attachInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const token = parsed.id;

        if (token && config.headers) {
          config.headers.Authorization = `${token}`;
        }
      } catch (e) {
        console.error(ERROR_MESSAGES.SYSTEM.USER_LOAD_ERROR, e);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      }
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response.data?.data,

    (error: AxiosError<ErrorResponseBody>) => {
      const status = error.response?.status;
      const message = error.response?.data?.data?.message;

      if (status === HttpStatusCode.Unauthorized) {
        navigate("/login");
      }

      return Promise.reject(message || ERROR_MESSAGES.SYSTEM.UNKNOWN);
    },
  );
};
