import { useState, useEffect, useRef, useCallback } from 'react';
import { getThemeProducts } from '@/lib/api/themes';
import type { RankingProduct } from '@/types/api';

interface UseInfiniteScrollOptions {
  themeId: number;
  limit?: number;
}

interface UseInfiniteScrollReturn {
  products: RankingProduct[];
  isLoading: boolean;
  hasMore: boolean;
  loadingRef: React.RefObject<HTMLDivElement | null>;
}

export const useInfiniteScroll = ({ 
  themeId, 
  limit = 20 
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn => {
  const [products, setProducts] = useState<RankingProduct[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const response = await getThemeProducts(themeId, cursor, limit);
      setProducts(prev => [...prev, ...response.list]);
      setCursor(response.cursor);
      setHasMore(response.hasMoreList);
    } catch (error) {
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [themeId, cursor, limit]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    const element = loadingRef.current;
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [loadMore, hasMore, isLoading]);

  useEffect(() => {
    const loadInitial = async () => {
      setProducts([]);
      setCursor(0);
      setHasMore(true);
      setIsLoading(true);
      try {
        const response = await getThemeProducts(themeId, 0, limit);
        setProducts(response.list);
        setCursor(response.cursor);
        setHasMore(response.hasMoreList);
      } catch (error) {
        setProducts([]);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitial();
  }, [themeId, limit]);

  return {
    products,
    isLoading,
    hasMore,
    loadingRef,
  };
}; 