import { useState, useEffect, useCallback } from 'react';
import useApi from '@/apis/useApi';
import { API_URLS } from './constants';

export interface Product {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

interface ThemeProductsResponse {
  data: {
    list: Product[];
    cursor: number;
    hasMoreList: boolean;
  };
}
interface InfiniteProducts {
  list: Product[];
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
}

export const useGetThemeProducts = (
  themeId: number,
  limit = 10,
): InfiniteProducts => {
  const [cursor, setCursor] = useState(0);
  const [list, setList] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { isLoading, error, execute } = useApi<
    ThemeProductsResponse,
    { params: { cursor: number; limit: number } }
  >('get', API_URLS.THEME_PRODUCTS(themeId));

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    const res = await execute({ params: { cursor, limit } });
    setList(prev => {
      const merged = [...prev, ...res.data.list];
      const map = new Map<number, Product>();
      merged.forEach(item => map.set(item.id, item));
      return Array.from(map.values());
    });
    setCursor(res.data.cursor);
    setHasMore(res.data.hasMoreList);
  }, [cursor, limit, hasMore, isLoading, execute]);


  useEffect(() => {
    loadMore();
  }, []);

  return { list, isLoading, error, hasMore, loadMore };
};
