import apiClient from './index';
import type {
  RankingResponse,
  TargetType,
  RankType,
  ProductResponse,
} from './types';
import axios from 'axios';

/**
 * 실시간 급상승 선물 랭킹을 조회합니다.
 * @param targetType - 대상 타입 (ALL, FEMALE, MALE, TEEN)
 * @param rankType - 랭킹 타입 (MANY_WISH, MANY_RECEIVE, MANY_WISH_RECEIVE)
 */
export const getRankingProducts = async (
  targetType: TargetType = 'ALL',
  rankType: RankType = 'MANY_WISH'
): Promise<RankingResponse> => {
  const response = await apiClient.get<RankingResponse>(
    '/api/products/ranking',
    {
      params: { targetType, rankType },
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

const baseURL = import.meta.env.VITE_API_BASE_URL;
export async function getProductSummary(productId: string) {
  const response = await axios.get(
    `${baseURL}/api/products/${productId}/summary`
  );
  return response.data.data;
}

export default {
  getRankingProducts,
  getProductById,
};
