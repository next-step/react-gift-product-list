import axiosInstance from '@apis/axiosInstance';
import { useEffect, useState } from 'react';

type UseFetchResult<T> = {
  data: T | null;
  loading: boolean;
  hasError: boolean; //추후 변경 예정
};

const useFetch = <T>(url: string): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axiosInstance.get(url);
        setData(res.data.data);
      } catch (error) {
        console.error('오류 발생: ', error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [url]);

  return { data, loading, hasError };
};

export default useFetch;
