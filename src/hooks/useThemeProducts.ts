import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { getThemeProductsUrl } from '@/constants/api';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { Product } from '@/types/product';

const LIMIT = 10;

export const useThemeProducts = (themeId: string | undefined) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!themeId || !hasMore || pending) return;
    setPending(true);
    setError(false);

    try {
      const res = await axios.get<{
        data: { list: Product[]; hasMoreList: boolean; cursor: number };
      }>(getThemeProductsUrl(themeId), {
        params: { cursor, limit: LIMIT },
      });

      const {
        list: newProducts,
        hasMoreList,
        cursor: nextCursor,
      } = res.data.data;

      setProducts(prev => {
        const merged = [...prev, ...newProducts];
        const unique = Array.from(new Map(merged.map(p => [p.id, p])).values());
        return unique;
      });
      setHasMore(hasMoreList);
      setCursor(nextCursor);
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  }, [themeId, cursor, hasMore, pending]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useIntersectionObserver({
    target: observerRef,
    onIntersect: fetchProducts,
    enabled: hasMore && !pending,
  });

  return {
    products,
    pending,
    error,
    hasMore,
    observerRef,
  };
};
