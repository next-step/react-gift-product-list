import axiosInstance from '@apis/axiosInstance';
import { useEffect, useState } from 'react';

type UseFetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: unknown; //추후 변경 예정
};

const useFetch = <T>(
  url: string,
  body?: Record<string, unknown>
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axiosInstance.get(url, body);
        setData(res.data.data);
      } catch (err) {
        console.error('오류 발생: ', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [url, body]);

  return { data, loading, error };
};

export default useFetch;
