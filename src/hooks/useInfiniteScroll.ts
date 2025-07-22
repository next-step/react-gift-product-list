import { useCallback, useState } from 'react';

interface InfiniteResponse<T> {
  list: T[];
  cursor: number;
  hasMoreList: boolean;
}

export function useInfiniteScroll<T>(fetchFunc: (cursor: number) => Promise<InfiniteResponse<T>>) {
  const [items, setItems] = useState<T[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // 최초 데이터 로딩 여부

  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetchFunc(cursor);
      setItems((prev) => [...prev, ...response.list]);
      setCursor(response.cursor);
      setHasMore(response.hasMoreList);
    } catch (error) {
      console.error('무한 스크롤 에러:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [cursor, fetchFunc, hasMore, loading]);

  return {
    items,
    cursor,
    loading,
    initialLoading,
    hasMore,
    fetchMore,
  };
}
