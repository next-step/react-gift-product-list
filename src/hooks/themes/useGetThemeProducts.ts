import { useCallback, useEffect, useState, type RefObject } from "react";
import {
  getThemeProducts,
  type ThemeProductResponseBody,
} from "@/api/themes/get-theme-product";
import { useApiStatus } from "@/hooks/common/useApiStatus";
import { useInView } from "@/hooks/common/useInview";
import type { ProductType } from "@/types";

interface UseThemeProductsResult {
  products: ProductType[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  inView: boolean;
  ref: RefObject<HTMLDivElement | null>;
  fetchNextPage: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const useGetThemeProducts = (
  themeId: number,
  limit: number = 10,
  inViewOptions?: { threshold?: number; rootMargin?: string },
): UseThemeProductsResult => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { data, loading, error, execute } =
    useApiStatus<ThemeProductResponseBody>();

  const fetchProducts = useCallback(
    async (currentCursor: number, isRefresh: boolean = false) => {
      return execute(() =>
        getThemeProducts({
          themeId,
          cursor: currentCursor,
          limit,
        }),
      ).then(() => {
        if (data) {
          setProducts(prev =>
            isRefresh ? data.list : [...prev, ...data.list],
          );
          setCursor(data.cursor);
          setHasMore(data.hasMoreList);
        }
      });
    },
    [execute, themeId, limit, data],
  );

  const fetchNextPage = useCallback(async () => {
    if (!loading && hasMore) {
      await fetchProducts(cursor);
    }
  }, [fetchProducts, cursor, loading, hasMore]);

  const refresh = useCallback(async () => {
    setProducts([]);
    setCursor(0);
    setHasMore(true);
    await fetchProducts(0, true);
  }, [fetchProducts]);

  const { ref, inView } = useInView({
    callback: fetchNextPage,
    ...inViewOptions,
  });

  useEffect(() => {
    fetchProducts(0, true);
  }, [themeId]);

  useEffect(() => {
    if (data) {
      setProducts(prev => (cursor === 0 ? data.list : [...prev, ...data.list]));
      setCursor(data.cursor);
      setHasMore(data.hasMoreList);
    }
  }, [data]);

  return {
    products,
    loading,
    error,
    hasMore,
    inView,
    ref,
    fetchNextPage,
    refresh,
  };
};
