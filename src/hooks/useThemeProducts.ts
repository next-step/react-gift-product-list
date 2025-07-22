import { getThemeProducts } from '@/lib/api/themes';
import type { RankingProduct } from '@/types/api';
import { useInfiniteScroll } from './useInfiniteScroll'; 
import { useCallback } from 'react';

export const useThemeProducts = (themeId: number, limit: number = 20) => {
  const fetchThemeProducts = useCallback(async (cursor: number | null = 0) => {
    const response = await getThemeProducts(themeId, cursor ?? 0, limit);

    return {
      list: response.list,
      nextCursor: response.cursor,
      hasMore: response.hasMoreList,
    };
  }, [themeId, limit]);

  const { 
    items: products,
    isLoading, 
    hasMore, 
    loadingRef 
  } = useInfiniteScroll<RankingProduct>({ fetcher: fetchThemeProducts });

  return { products, isLoading, hasMore, loadingRef };
};