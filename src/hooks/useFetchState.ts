import { useState, useCallback } from 'react';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

interface UseFetchStateReturn<T> {
  fetchState: FetchState<T>;
  setLoading: (isLoading: boolean) => void;
  setSuccess: (data: T) => void;
  setError: () => void;
  reset: () => void;
}

export const useFetchState = <T>(initialLoading = false): UseFetchStateReturn<T> => {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    isLoading: initialLoading,
    isError: false,
    data: null,
  });

  const setLoading = useCallback(() => {
    setFetchState(prev => ({ ...prev, isLoading: true, isError: false }));
  }, []);

  const setSuccess = useCallback((data: T) => {
    setFetchState({
      isLoading: false,
      isError: false,
      data,
    });
  }, []);

  const setError = useCallback(() => {
    setFetchState({
      isLoading: false,
      isError: true,
      data: null,
    });
  }, []);

  const reset = useCallback(() => {
    setFetchState({
      isLoading: false,
      isError: false,
      data: null,
    });
  }, []);

  return {
    fetchState,
    setLoading,
    setSuccess,
    setError,
    reset,
  };
}; 