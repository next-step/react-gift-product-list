import apiClient from '@/apis/apiClient';
import type { RankItemType, ProductDetailResponseDto, RankingQuery } from '@/types/DTO/productDTO';

export async function getRanking({ targetType, rankType }: RankingQuery): Promise<RankItemType[]> {
  const response = await apiClient.get<ProductDetailResponseDto>('/products/ranking', {
    params: {
      targetType: targetType,
      rankType: rankType,
    },
  });
  return response.data.data;
}
