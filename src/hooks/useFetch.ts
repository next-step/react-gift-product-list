import { useState, useEffect } from "react";
import type { FetchState } from "@/types/FetchState";

interface UseFetchOptions<T> {
  fetchFn: () => Promise<T>;
  errorHandler: (error: unknown) => void;
  enabled?: boolean;
  validateData?: ((data: T) => boolean)[];
  deps?: React.DependencyList;
}

export function useFetch<T>({
  fetchFn,
  validateData,
  errorHandler,
  enabled = true,
  deps = [],
}: UseFetchOptions<T>) {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    isError: false,
  });

  const executeFetch = async () => {
    setFetchState({
      data: null,
      isLoading: true,
      isError: false,
    });

    try {
      const data = await fetchFn();

      if (validateData && !validateData.every((validator) => validator(data))) {
        setFetchState({
          data: null,
          isLoading: false,
          isError: true,
        });
        return null;
      }

      setFetchState({
        data,
        isLoading: false,
        isError: false,
      });

      return data;
    } catch (error) {
      errorHandler(error);

      setFetchState({
        data: null,
        isLoading: false,
        isError: true,
      });

      throw error;
    }
  };

  useEffect(() => {
    // deps가 배열 리터럴이 아닌 변수이기 때문에 생기는 경고
    if (enabled) {
      executeFetch();
    }
  }, deps);

  return {
    ...fetchState,
    executeFetch,
  };
}
