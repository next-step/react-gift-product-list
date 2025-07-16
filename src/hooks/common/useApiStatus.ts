import { API_ERROR_MESSAGE } from "@/constants";
import { useCallback, useState } from "react";

interface UseApiStatusResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (apiCall: () => Promise<T>) => Promise<void>;
}

export const useApiStatus = <T>(): UseApiStatusResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      setData(result);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : API_ERROR_MESSAGE.DEFAULT,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
};
