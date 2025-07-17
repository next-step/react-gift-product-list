import { showToast } from "@/utils";
import { API_ERROR_MESSAGE } from "@/constants";
import { useCallback, useState } from "react";

interface UseApiStatusResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (apiCall: () => Promise<T>) => Promise<void>;
}
interface UseApiStatusOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  rethrowError?: boolean;
}

export const useApiStatus = <T>(
  options: UseApiStatusOptions = {},
): UseApiStatusResult<T> => {
  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = "요청이 성공했습니다.",
    rethrowError = false,
  } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (apiCall: () => Promise<T>) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiCall();
        setData(result);

        if (showSuccessToast) {
          showToast.success(successMessage);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : API_ERROR_MESSAGE.DEFAULT;
        setError(errorMessage);

        if (showErrorToast) {
          showToast.error(errorMessage);
        }
        if (rethrowError) {
          throw error;
        }
      } finally {
        setLoading(false);
      }
    },
    [showSuccessToast, showErrorToast, successMessage, rethrowError],
  );

  return { data, loading, error, execute };
};
