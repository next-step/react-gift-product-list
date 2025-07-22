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

  const loadData = useCallback(async (type: 'initial' | 'more') => {
    if (type === 'more' && (isLoading || !hasMore)) return;  
    setIsLoading(true);
    
    try {
      const targetCursor = type === 'initial' ? 0 : cursor;
      const response = await fetcher(targetCursor);

      if (type === 'initial') {
        setItems(response.list);
      } else {
        setItems(prev => [...prev, ...response.list]);
      }    
      setCursor(response.nextCursor);
      setHasMore(response.hasMore);
    } catch (error) {
      if (type === 'initial') setItems([]);
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
          loadData('more');
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadingRef.current);
    return () => observer.disconnect();
  }, [loadData]);

  useEffect(() => {
    setItems([]);
    setCursor(0);
    setHasMore(true);
    setIsLoading(true);
    loadData('initial');
  }, [fetcher]);

  return {
    items,
    isLoading,
    hasMore,
    loadingRef,
  };
}; 