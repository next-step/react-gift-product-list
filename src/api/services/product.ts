import apiClient from '@/api'
import { API_ENDPOINTS } from '@/api/constants/endpoints'
import { RankType, TargetType, type Product } from '@/api/types/product'

// * 상품 랭킹 목록 조회하기
export const fetchProductRankList = async (
  targetType: TargetType = TargetType.ALL,
  rankType: RankType = RankType.MANY_WISH,
): Promise<Product[]> => {
  const res = await apiClient.get<{ data: Product[] }>(API_ENDPOINTS.PRODUCTS.RANKING, {
    params: {
      targetType,
      rankType,
    },
  })
  return res.data.data
}
