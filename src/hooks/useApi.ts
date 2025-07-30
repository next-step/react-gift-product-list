import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';

export const useApi = <T>(fetchFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFn();
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) {
          if (isAxiosError(err)) {
            setError(
              err.response?.data?.message || '요청 중 오류가 발생했습니다.'
            );
          } else {
            setError(
              (err as Error).message || '알 수 없는 오류가 발생했습니다.'
            );
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchFn]);

  return { data, loading, error };
};
