import apiClient from '@/api'
import { RankType, TargetType, type Product } from '@/api/types/product'

// * 상품 랭킹 목록 조회하기
export const fetchProductRankList = async (
  targetType: TargetType = TargetType.ALL,
  rankType: RankType = RankType.MANY_WISH,
): Promise<Product[]> => {
  const res = await apiClient.get<{ data: Product[] }>('/api/products/ranking', {
    params: {
      targetType,
      rankType,
    },
  })
  return res.data.data
}
