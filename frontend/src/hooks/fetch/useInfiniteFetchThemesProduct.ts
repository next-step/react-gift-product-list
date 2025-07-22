import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import type { Product } from '@/hooks/fetch/useFetchRanking.ts';

interface ThemesProduct {
  list: Product[];
  cursor: number;
  hasMoreList: boolean;
}

export default function useInfiniteFetchThemesProduct(url: string) {
  const [list, setList] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const isFetchingRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (!hasMore || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setLoading(true);
    setError(false);

    try {
      const res = await axios.get<{ data: ThemesProduct }>(`${url}?cursor=${cursor}&limit=10`);
      const { list: newItems, cursor: nextCursor, hasMoreList } = res.data.data;

      setList((prev) => [...prev, ...newItems]);
      setCursor(nextCursor);
      setHasMore(hasMoreList);
    } catch (error) {
      setStatusCode(error.response?.status || null);
      setError(true);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [url, cursor, hasMore]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    list,
    loading,
    error,
    hasMore,
    fetchNextPage: fetchData,
    statusCode,
  };
}
