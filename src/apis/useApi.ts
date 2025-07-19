import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '@/apis/httpClient';
import { PATH } from '@/constants/paths';
import { isAxiosError } from 'axios';
import { LOGIN_REQUIRED_MESSAGE } from '@/apis/constants';

type ApiMethod = 'get' | 'post' | 'put' | 'delete';

interface ApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

const useApi = <T, P = void>(
  method: ApiMethod,
  url: string,
  options?: ApiOptions<T>,
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const execute = useCallback(
    async (payload?: P) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient[method]<T>(url, payload);
        setData(response.data);
        if (options?.onSuccess) {
          options.onSuccess(response.data);
        }
        return response.data;
      } catch (err) {
        const error = err as Error;
        setError(error);
        if (isAxiosError(err) && err.response?.status === 401) {
          alert(LOGIN_REQUIRED_MESSAGE);
          navigate(PATH.LOGIN);
        }
        if (options?.onError) {
          options.onError(error);
        }
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [url, method, navigate, options],
  );

  useEffect(() => {
    if (method === 'get') {
      (execute as () => void)();
    }
  }, [execute, method]);

  return { data, isLoading, error, execute };
};

export default useApi;
