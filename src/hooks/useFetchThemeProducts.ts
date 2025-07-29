import { useState, useEffect, useRef, useCallback } from 'react';
import api from '@/api/api';

interface ThemeProduct {
  id: number;
  name: string;
  price: { basicPrice: number; sellingPrice: number; discountRate: number };
  imageURL: string;
  brandInfo: { name: string };
}

export function useFetchThemeProducts(
  themeId: number,
  limit: number = 10
) {
  const [products, setProducts] = useState<ThemeProduct[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchPage = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await api.get<{
        data: { list: ThemeProduct[]; cursor: number; hasMoreList: boolean };
      }>(
        `/api/themes/${themeId}/products`,
        { params: { cursor, limit } }
      );
      const { list, cursor: nextCursor, hasMoreList } = res.data.data;
      setProducts(prev => [...prev, ...list]);
      setCursor(nextCursor);
      setHasMore(hasMoreList);
    } catch (err) {
      console.error('테마별 상품 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  }, [themeId, cursor, hasMore, loading, limit]);

  useEffect(() => {
    // 테마가 변경되면 초기화
    setProducts([]);
    setCursor(0);
    setHasMore(true);
  }, [themeId]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchPage();
        }
      },
      { rootMargin: '200px' }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchPage]);

  return { products, hasMore, loading, observerRef };
}
