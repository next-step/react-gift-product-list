//데이터를 계속해서 불러오는 
import { useState, useCallback } from 'react';
import type { AxiosError } from 'axios';

interface UseInfiniteQueryProps<T> {
  queryFn: (cursor?: number) => Promise<{ list: T[], cursor: number, hasMoreList: boolean }>;
}

export const useInfiniteQuery = <T>({ queryFn }: UseInfiniteQueryProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [cursor, setCursor] = useState<number | null>(null);

  const fetchNextPage = useCallback(async (cursor?: number) => {
    if (!hasNextPage || isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      const { list: newList, cursor: nextCursor, hasMoreList } = await queryFn(cursor);
      setData((prevData) => [...prevData, ...newList]);
      setCursor(nextCursor);
      setHasNextPage(hasMoreList);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsLoading(false);
    }
  }, [queryFn, cursor, hasNextPage, isLoading]);

  return { data, isLoading, error, fetchNextPage, hasNextPage };
};

export default useInfiniteQuery;
