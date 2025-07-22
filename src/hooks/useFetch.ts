import { useEffect, useState, useCallback } from 'react';

interface UseFetchResult<T> {
  data: T | undefined;
  pending: boolean;
  error: boolean;
  refetch: () => void;
}

export const useFetch = <T>(fetchFn: () => Promise<T>): UseFetchResult<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setPending(true);
    setError(false);
    try {
      const result = await fetchFn();
      setData(result);
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, pending, error, refetch: fetchData };
};
