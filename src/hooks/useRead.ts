import type { ApiError } from '@/apis/types';
import { AxiosError, type AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';

type UseReadParams<T, P> = {
  fetch: (params: P) => Promise<AxiosResponse<T>>;
  initFetchParams: P;
};

type UseReadReturn<T, P> = {
  isLoading: boolean;
  isError: boolean;
  data: T | undefined;
  error: ApiError | Error | undefined;
  refetch: (params: P) => Promise<void>;
};

export const useRead = <T, P>({
  fetch,
  initFetchParams,
}: UseReadParams<T, P>): UseReadReturn<T, P> => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<UseReadReturn<T, P>['data']>(undefined);
  const [error, setError] = useState<UseReadReturn<T, P>['error']>(undefined);

  const fetchData = useCallback(
    async (params: P) => {
      try {
        setIsLoading(true);
        setIsError(false);
        setError(undefined);

        const { data } = await fetch(params);

        setData(data);
      } catch (error) {
        setIsError(true);

        if (error instanceof AxiosError) {
          return setError(error.response?.data.data as ApiError);
        }

        if (error instanceof Error) {
          return setError(error);
        }

        setError(new Error('알 수 없는 오류가 발생했습니다.'));
      } finally {
        setIsLoading(false);
      }
    },
    [fetch],
  );

  const refetch = async (params: P) => {
    await fetchData(params);
  };

  useEffect(() => {
    fetchData(initFetchParams);
  }, [fetchData]);

  return {
    isLoading,
    isError,
    data,
    error,
    refetch,
  };
};
