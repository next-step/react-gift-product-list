import type { AxiosResponse } from 'axios';
import type { ProductSummary } from './type';
import { apiInstance } from '@/apis/instance';

import type { ApiErrorResponse } from '@/apis/types';
import { API_PRODUCTS_PATH } from './path';

type GetProductsSummaryParams = {
  productId: string;
};

export const getProductsSummary = async (
  params: GetProductsSummaryParams,
): Promise<AxiosResponse<{ data: ProductSummary }, ApiErrorResponse>> => {
  return await apiInstance.get<{ data: ProductSummary }>(
    API_PRODUCTS_PATH.summary(params.productId),
  );
};
