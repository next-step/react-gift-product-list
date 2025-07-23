import { useEffect, useState } from 'react';

interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export const useFetch = <T>(url: string | null): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('존재하지 않는 리소스입니다.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result && result.data !== undefined) {
          setData(result.data);
        } else {
          throw new Error('예상치 못한 응답 구조입니다.');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError((err as Error).message || '데이터를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};
