import { useState, useEffect, useRef, useCallback } from 'react';

interface FetchResult<T> {
  list: T[];
  nextCursor?: number | null;
  hasMore: boolean;
}

interface UseInfiniteScrollOptions<T> {
  fetcher: (cursor?: number | null) => Promise<FetchResult<T>>;
}

export const useInfiniteScroll = <T>({ 
  fetcher,
}: UseInfiniteScrollOptions<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [cursor, setCursor] = useState<number | null | undefined>(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    
    try {
      const response = await fetcher(cursor);
      setItems(prev => [...prev, ...response.list]);
      setCursor(response.nextCursor);
      setHasMore(response.hasMore);
    } catch (error) {
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [fetcher, cursor, hasMore, isLoading]);

  useEffect(() => {
    if (!loadingRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadingRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  useEffect(() => {
    const loadInitial = async () => {
      setItems([]);
      setCursor(0);
      setHasMore(true);
      setIsLoading(true);
      try {
        const response = await fetcher(0);
        setItems(response.list);
        setCursor(response.nextCursor);
        setHasMore(response.hasMore);
      } catch (error) {
        setItems([]);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitial();
  }, [fetcher]);

  return {
    items,
    isLoading,
    hasMore,
    loadingRef,
  };
}; 