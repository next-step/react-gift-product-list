import { useState, useEffect, useCallback } from 'react';
import { getThemeProductList } from '@/services/theme';
import type { ThemeProduct } from '@/types/theme';
import { useInView } from './useInView';

const LIMIT = 10;

export const useThemeProducts = (themeId: number) => {
  const [products, setProducts] = useState<ThemeProduct[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const loadProducts = useCallback(async (currentCursor: number) => {
    setIsPending(true);
    setError(null);
    try {
      const { list, cursor: nextCursor, hasMoreList } = await getThemeProductList(
        themeId,
        currentCursor,
        LIMIT,
      );
      setProducts((prev) => (currentCursor === 0 ? list : [...prev, ...list]));
      setCursor(nextCursor);
      setHasMore(hasMoreList);
    } catch (err) {
      setError(err);
    } finally {
      setIsPending(false);
    }
  }, [themeId]);

  const { ref: loadMoreRef } = useInView({
    onInView: () => {
      if (!isPending && hasMore) {
        loadProducts(cursor);
      }
    },
  });

  useEffect(() => {
    setProducts([]);
    setCursor(0);
    setHasMore(true);
    setIsPending(false);
    setError(null);
    loadProducts(0);
  }, [themeId, loadProducts]);

  return { products, isPending, error, hasMore, loadMoreRef };
};