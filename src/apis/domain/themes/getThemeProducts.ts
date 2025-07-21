import { apiInstance } from '@/apis/instance';
import { API_THEMES_PATH } from './path';
import type { ProductData } from '../products/type';

type GetThemeProductsParams = {
  themeId: string;
  cursor?: number;
  limit?: number;
};

export const getThemeProducts = async (params: GetThemeProductsParams) => {
  return await apiInstance.get<{
    data: {
      list: ProductData[];
      cursor: number;
      hasMoreList: boolean;
    };
  }>(API_THEMES_PATH.themeProducts(params.themeId), {
    params: {
      cursor: params.cursor,
      limit: params.limit,
    },
  });
};
