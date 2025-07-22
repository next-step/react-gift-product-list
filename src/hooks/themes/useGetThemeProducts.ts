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

  const { loading, error, execute } = useApiStatus<ThemeProductResponseBody>();

  const fetchProducts = useCallback(
    async (currentCursor: number, isRefresh: boolean = false) => {
      try {
        await execute(async () => {
          const response = await getThemeProducts({
            themeId,
            cursor: currentCursor,
            limit,
          });

          setProducts(prev =>
            isRefresh ? response.list : [...prev, ...response.list],
          );
          setCursor(response.cursor);
          setHasMore(response.hasMoreList);

          return response;
        });
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    },
    [execute, themeId, limit],
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
