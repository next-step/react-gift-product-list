import { useState, useEffect } from 'react';
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
function useFetch<T>(url: string, options?: AxiosRequestConfig) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetchData = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const response = await axios(url, { ...options });
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
  };

  useEffect(() => {
    fetchData();
  }, [url, JSON.stringify(options)]); // options 객체 변경 감지를 위해 stringify

  // 수동으로 데이터를 다시 불러오는 함수 제공
  const refetch = () => {
    fetchData();
  };

  return { ...state, refetch };
}

export default useFetch;
