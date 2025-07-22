import { useState, useEffect } from 'react';

export default function useApiRequest<T, Args extends any[]>(
  requestFn: (...args: Args) => Promise<T>,
  args: Args,
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await requestFn(...args);
        setData(result);
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [requestFn, ...args]);

  return { data, loading, error };
}
