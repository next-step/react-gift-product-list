import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * 데이터 페칭을 위한 커스텀 훅
 * @param url - API 엔드포인트
 * @param options - Axios 요청 옵션
 */
export const useFetch = function <T>(
  url: string,
  options?: AxiosRequestConfig
) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  // options 객체의 참조를 안정화
  const stableOptions = useMemo(() => options, [options]);

  const fetchData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const response = await axios(url, { ...stableOptions });
      setState({
        data: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error as Error,
      });
    }
  }, [url, stableOptions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 수동으로 데이터를 다시 불러오는 함수 제공
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch };
};
