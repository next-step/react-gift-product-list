import { useEffect, useState } from 'react';
import { fetchThemeProducts } from '@/api/themeProduct';
import type { Product } from '@/api/themeProduct';

interface UseThemeProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
}

export const useThemeProducts = (
  themeId: number,
  initialLimit: number = 10
): UseThemeProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const data = await fetchThemeProducts(themeId, cursor, initialLimit);
      setProducts((prev) => [...prev, ...data.list]);
      setCursor(data.cursor);
      setHasMore(data.hasMoreList);
    } catch (err: any) {
      setError('상품 목록을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setCursor(0);
    setHasMore(true);
    setError(null);

    loadMore();
  }, [themeId]);

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
  };
};
