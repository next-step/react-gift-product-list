import { useCallback, useEffect, useRef } from 'react';

interface UseInfiniteScrollObserverOptions {
  fetchNextPage: () => void,
  hasMore: boolean;
  loading: boolean;
  threshold?: number;
}

export default function useInfiniteScrollObserver(
  {
    fetchNextPage,
    hasMore,
    loading,
    threshold = 0.1,
  }: UseInfiniteScrollObserverOptions,
) {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasMore, loading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold });
    const current = observerRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    }
  }, [handleObserver, threshold]);

  return observerRef;
}

