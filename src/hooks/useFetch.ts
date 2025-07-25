import { useState, useEffect } from 'react';

interface UseFetchOptions {
  enabled?: boolean;
}

export const useFetch = <T,>(
  asyncFunction: () => Promise<T>,
  deps: any[] = [],
  options: UseFetchOptions = { enabled: true }
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!options.enabled) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await asyncFunction();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(String(err)));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, deps);

  return { data, isLoading, error };
};
