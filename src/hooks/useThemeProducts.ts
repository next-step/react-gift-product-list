import { useCallback, useEffect, useRef, useState } from 'react';
import { getThemeProductsUrl } from '@/constants/api';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useFetch } from '@/hooks/useFetch';
import type { Product } from '@/types/product';

const LIMIT = 10;

export const useThemeProducts = (themeId: string | undefined) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!themeId) throw new Error('themeId is undefined');

    const res = await fetch(
      `${getThemeProductsUrl(themeId)}?cursor=${cursor}&limit=${LIMIT}`
    );
    if (!res.ok) throw new Error('Failed to fetch theme products');

    const json = await res.json();
    return json.data as {
      list: Product[];
      hasMoreList: boolean;
      cursor: number;
    };
  }, [themeId, cursor]);

  const { data, pending, error, refetch } = useFetch(fetchProducts);

  useEffect(() => {
    if (!data) return;
    const { list, hasMoreList, cursor: nextCursor } = data;

    setProducts(prev => {
      const merged = [...prev, ...list];
      const unique = Array.from(new Map(merged.map(p => [p.id, p])).values());
      return unique;
    });
    setHasMore(hasMoreList);
    setCursor(nextCursor);
  }, [data]);

  useIntersectionObserver({
    target: observerRef,
    onIntersect: refetch,
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
