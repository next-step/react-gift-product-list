import apiClient from './index';
import type { RankingResponse, FilterOption, ProductResponse } from './types';

/**
 * 실시간 급상승 선물 랭킹을 조회합니다.
 * @param filter - 필터 옵션 (all, price-asc, price-desc, popular)
 */
export const getRankingProducts = async (
  filter: FilterOption = 'all'
): Promise<RankingResponse> => {
  const response = await apiClient.get<RankingResponse>(
    '/api/products/ranking',
    {
      params: { filter },
    }
  );
  return response.data;
};

/**
 * 특정 상품의 상세 정보를 조회합니다.
 * @param productId - 상품 ID
 */
export const getProductById = async (
  productId: string | number
): Promise<ProductResponse> => {
  const response = await apiClient.get<ProductResponse>(
    `/api/products/${productId}`
  );
  return response.data;
};

export default {
  getRankingProducts,
  getProductById,
};
