import axios from "axios";
import type { ApiError } from "@/api/types";
import { API_ERROR_MESSAGE } from "@/constants";

export const handleApiError = (
  error: unknown,
  fallbackMessage = API_ERROR_MESSAGE.DEFAULT as string,
): never => {
  if (axios.isAxiosError<BaseResponse<ApiError>>(error)) {
    if (error.response) {
      const errorData = error.response.data;
      const apiError = errorData.data;

      const message = apiError?.message || fallbackMessage;
      throw new Error(message);
    } else if (error.request) {
      throw new Error(API_ERROR_MESSAGE.NETWORK);
    } else {
      throw new Error(API_ERROR_MESSAGE.SETTING);
    }
  }

  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error(fallbackMessage);
};

export const executeApi = async <T>(
  apiCall: () => Promise<T>,
  fallbackMessage?: string,
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    handleApiError(error, fallbackMessage);
    throw new Error("");
  }
};
