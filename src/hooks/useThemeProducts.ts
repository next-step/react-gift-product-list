import { useCallback, useEffect, useState } from "react";
import { type Product, fetchThemeProducts } from "@/api/theme";
import { ERROR_MESSAGES } from "@/constants/messages";
import { PAGE_SIZE } from "@/constants/pagination";

export const useThemeProducts = (themeId: number | undefined) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!themeId) return;

    const fetchInitial = async () => {
      setLoading(true);
      setProducts([]);
      setCursor(0);
      setHasMore(true);
      setError(null);

      try {
        const {
          list,
          cursor: nextCursor,
          hasMoreList,
        } = await fetchThemeProducts(themeId, 0, PAGE_SIZE);

        setProducts(list);
        setCursor(nextCursor);
        setHasMore(hasMoreList);
      } catch {
        setError(ERROR_MESSAGES.THEME.FAIL_TO_LOAD);
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, [themeId]);

  const fetchNext = useCallback(async () => {
    if (!themeId || loading || !hasMore) return;

    setLoading(true);
    try {
      const {
        list,
        cursor: nextCursor,
        hasMoreList,
      } = await fetchThemeProducts(themeId, cursor, PAGE_SIZE);

      setProducts((prev) => [...prev, ...list]);
      setCursor(nextCursor);
      setHasMore(hasMoreList);
    } catch {
      setError(ERROR_MESSAGES.THEME.FAIL_TO_LOAD);
    } finally {
      setLoading(false);
    }
  }, [themeId, cursor, loading, hasMore]);

  return {
    products,
    loading,
    error,
    hasMore,
    fetchNext,
  };
};
