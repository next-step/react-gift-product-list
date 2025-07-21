import { useEffect, useRef, useState } from 'react';

export function useInfiniteScroll<T>(
  fetchFunc: (cursor: number) => Promise<{ list: T[]; cursor: number; hasMoreList: boolean }>,
) {
  const [items, setItems] = useState<T[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 },
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, loading]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const result = await fetchFunc(cursor);
      setItems((prev) => [...prev, ...result.list]);
      setCursor(result.cursor);
      setHasMore(result.hasMoreList);
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  return { items, loading, loaderRef };
}
