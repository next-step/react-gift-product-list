import { useEffect, useState } from 'react';

type ApiFunction<T> = () => Promise<{ data: { data: T } }>;

export function useApi<T>(apiFunc: ApiFunction<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiFunc();
        setData(res.data.data);
      } catch (e) {
        console.error('API 호출 실패:', e);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [apiFunc]);

  return { data, isLoading, hasError };
}