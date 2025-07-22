import { useState, useEffect } from 'react';

export default function useApiRequest<T, Args extends any[]>(
  requestFn: (...args: Args) => Promise<T>,
  args: Args,
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await requestFn(...args);
        setData(result);
        setHasError(false);
      } catch (err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [requestFn, ...args]);

  return { data, isLoading, hasError };
}
