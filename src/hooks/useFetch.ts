import { useState, useEffect, useCallback } from 'react';

export type TargetType = 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
export type RankType = 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface UseFetchOptions {
  initialData?: any;
  errorMessage?: string;
  immediate?: boolean;
}

export const useFetch = <T = any>(
  fetchFunction: (...args: any[]) => Promise<T>,
  dependencies: any[] = [],
  options: UseFetchOptions = {}
): UseFetchReturn<T> => {
  const {
    initialData = null,
    errorMessage = '데이터를 불러오지 못했습니다.',
    immediate = true,
  } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFunction(...dependencies);
      setData(result);
    } catch (err: any) {
      setError(err.message || errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, errorMessage, ...dependencies]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return { data, loading, error, refetch };
};
