import apiClient from '@/api'
// import { RankType, TargetType } from '@/api/types/product'
import type { Product, RankType, TargetType } from '@/features/product'

// * 상품 랭킹 목록 조회하기
export const fetchProductRankList = async (
  targetType: TargetType = 'ALL',
  rankType: RankType = 'MANY_WISH',
): Promise<Product[]> => {
  const res = await apiClient.get<{ data: Product[] }>('/api/products/ranking', {
    params: {
      targetType,
      rankType,
    },
  })
  return res.data.data
}
