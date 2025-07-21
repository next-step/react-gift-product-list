import { useCallback, useEffect, useRef, useState } from 'react';

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
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadMore = useCallback(async () => {
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
      setIsInitialLoading(false);
    }
  }, [cursor, fetchFunc, hasMore, loading]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    });

    observerRef.current.observe(loaderRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loadMore, hasMore]);

  return {
    items,
    loading,
    loaderRef,
    cursor,
    isInitialLoading,
  };
}
