import type { Product } from '../types/GiftTheme';
import { fetcher } from './client';

interface ProductApiResponse {
  data: {
    list: Product[];
    cursor: number;
    hasMoreList: boolean;
  };
}

export const fetchThemeProducts = async (
  themeId: number,
  cursor = 0
): Promise<{
  products: Product[];
  nextCursor: number;
  hasNext: boolean;
}> => {
  const endpoint = `/api/themes/${themeId}/products?cursor=${cursor}`;
  const res = (await fetcher(
    endpoint,
    '상품을 불러오지 못했습니다.'
  )) as ProductApiResponse;

  return {
    products: res.data.list,
    nextCursor: res.data.cursor,
    hasNext: res.data.hasMoreList,
  };
};
