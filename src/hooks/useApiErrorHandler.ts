import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type HandleApiErrorOptions = {
  fallbackMessage?: string;
  redirectOnUnauthorized?: boolean;
  customHandler?: (
    statusCode: number,
    errorMessage?: string
  ) => boolean | string;
};

export const useApiErrorHandler = ({
  fallbackMessage = "알 수 없는 오류가 발생했어요.",
  redirectOnUnauthorized = true,
  customHandler,
}: HandleApiErrorOptions = {}) => {
  const navigate = useNavigate();

  const handleApiError = (error: any) => {
    const statusCode = error?.response?.status;
    const errorMessage = error?.response?.data?.data?.message;

    const customResult = customHandler?.(statusCode, errorMessage);

    if (customResult) {
      const customMessage =
        typeof customResult === "string" ? customResult : fallbackMessage;
      toast.error(customMessage);
      return;
    }

    if (statusCode === 401 && redirectOnUnauthorized) {
      navigate("/login");
      return;
    }

    if (statusCode >= 400 && statusCode < 500) {
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error(fallbackMessage);
      }
    } else {
      toast.error("서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return handleApiError;
};
