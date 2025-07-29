import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

/**
 * useFetch: axios를 사용해 간단하게 데이터 로드 로직을 재사용할 수 있는 훅
 * @param config - AxiosRequestConfig 또는 string URL
 * @param deps - 의존성 배열 (URL이나 파라미터 변경 시 재호출)
 */
export function useFetch<T>(
  config: AxiosRequestConfig | string,
  deps: any[] = []
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response =
        typeof config === 'string'
          ? await axios.get<T>(config)
          : await axios.request<T>(config);
      setData(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  return { data, loading, error };
}