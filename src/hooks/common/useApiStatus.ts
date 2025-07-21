import { API_ERROR_MESSAGE } from "@/constants";
import { useCallback, useState } from "react";

interface UseApiStatusResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (apiCall: () => Promise<T>) => Promise<void>;
}

export const useApiStatus = <T>(): UseApiStatusResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      setData(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error : new Error(API_ERROR_MESSAGE.DEFAULT);
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
};
