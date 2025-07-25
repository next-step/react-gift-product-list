import { useState, useEffect, useRef, useCallback } from 'react';
import type { RankItemType } from '@/types/DTO/productDTO';
import { getThemeProducts } from '@/apis/theme';

export function useIntersectionObserver(themeId: number) {
  const [products, setProducts] = useState<RankItemType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(0);
  const limit = 10;
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCursor((prev) => prev + limit);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  useEffect(() => {
    if (!themeId || !hasMore) return;
    setLoading(true);
    getThemeProducts(Number(themeId), cursor, limit)
      .then((data) => {
        setProducts((prev) => [...prev, ...data.list]);
        setHasMore(data.hasMoreList);
      })
      .finally(() => {
        setTimeout(() => setLoading(false));
      });
  }, [themeId, cursor]);

  return { products, loading, observer, lastProductRef };
}
