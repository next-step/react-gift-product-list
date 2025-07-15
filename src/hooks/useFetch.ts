import { useState, useEffect } from "react";
import type { FetchState } from "@/types/FetchState";

interface UseFetchOptions<T> {
  fetchFn: () => Promise<T[]>;
  errorMessage: string;
  validateData?: ((data: T[]) => boolean)[];
  deps?: React.DependencyList;
}

export function useFetch<T>({
  fetchFn,
  errorMessage,
  validateData,
  deps = [],
}: UseFetchOptions<T>) {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    const executeFetch = async () => {
      setFetchState({
        data: null,
        isLoading: true,
        isError: false,
      });

      try {
        const data = await fetchFn();

        if (
          validateData &&
          !validateData.every((validator) => validator(data))
        ) {
          setFetchState({
            data: null,
            isLoading: false,
            isError: true,
          });
          return;
        }

        setFetchState({
          data,
          isLoading: false,
          isError: false,
        });
      } catch (error) {
        console.error(errorMessage, error);

        setFetchState({
          data: null,
          isLoading: false,
          isError: true,
        });
      }
    };

    executeFetch();
  }, deps);

  return {
    ...fetchState,
  };
}
