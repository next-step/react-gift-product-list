import { apiInstance } from '@/apis/instance';
import { API_PRODUCTS_PATH } from './path';
import type { ProductData, ProductRankingFilterOption } from './type';
import type { AxiosResponse } from 'axios';
import type { ApiErrorResponse } from '@/apis/types';

type GetProductRankingParams = {
  targetType: ProductRankingFilterOption['targetType'];
  rankType: ProductRankingFilterOption['rankType'];
};

export const getProductRanking = async (
  params: GetProductRankingParams,
): Promise<AxiosResponse<{ data: ProductData[] }, ApiErrorResponse>> => {
  return await apiInstance.get<{ data: ProductData[] }>(API_PRODUCTS_PATH.ranking, {
    params,
  });
};
