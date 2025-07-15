import axios from "axios";
import type { ApiError } from "@/api/types";

export const handleApiError = (
  error: unknown,
  fallbackMessage = "알 수 없는 오류가 발생했습니다",
): never => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const errorData = error.response.data as BaseResponse<ApiError>;
      const apiError = errorData.data;

      const message = apiError?.message || fallbackMessage;
      throw new Error(message);
    } else if (error.request) {
      throw new Error(
        "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.",
      );
    } else {
      throw new Error("요청 설정 중 오류가 발생했습니다.");
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
