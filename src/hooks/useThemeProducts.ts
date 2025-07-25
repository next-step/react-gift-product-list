import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getThemeInfo, getThemeProducts } from "@/api/user/theme";
import type { ThemeInfoResponseDTO } from "@/types/DTO/themeDTO";
import type { CardItem } from "@/types/DTO/productDTO";
import { RouterPath } from "@/routes/path";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export function useThemeProducts(themeId: number | undefined) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<ThemeInfoResponseDTO | null>(null);
  const [products, setProducts] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreList, setHasMoreList] = useState(true);
  const [page, setPage] = useState(0);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef<number>(0);

  const loadThemeInfo = useCallback(async () => {
    if (!themeId) return;
    setLoading(true);
    try {
      const themeData = await getThemeInfo(themeId);
      setTheme(themeData);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        navigate(RouterPath.HOME, { replace: true });
      }
    } finally {
      setLoading(false);
    }
  }, [themeId]);

  const loadProducts = useCallback(async () => {
    if (!themeId || !hasMoreList) return;
    if (page > 0) {
      scrollPositionRef.current = window.scrollY;
    }
    setLoading(true);
    try {
      const productData = await getThemeProducts(themeId, page);
      const transformedProducts: CardItem[] = productData.list.map(
        (product) => ({
          id: product.id,
          imageUrl: product.imageURL,
          brand: product.brandInfo.name,
          name: product.name,
          price: product.price.sellingPrice,
        })
      );
      setProducts((prev) =>
        page === 0 ? transformedProducts : [...prev, ...transformedProducts]
      );
      setHasMoreList(productData.hasMoreList);
    } finally {
      setLoading(false);
      if (page > 0) {
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPositionRef.current);
        });
      }
    }
  }, [themeId, page, hasMoreList]);

  useEffect(() => {
    loadThemeInfo();
  }, [loadThemeInfo]);

  useEffect(() => {
    loadProducts();
  }, [page]);

  useInfiniteScroll({
    targetRef: observerRef,
    hasMore: hasMoreList,
    isLoading: loading,
    onLoadMore: () => setPage((prev) => prev + 1),
  });

  return {
    theme,
    products,
    loading,
    hasMoreList,
    observerRef,
  };
}
