import apiClient from '@/apis/apiClient';
import type {
  RankItemType,
  ProductDetailResponseDto,
  ProductSummaryRequestDTO,
  ProductSummaryResponseDTO,
  RankingQuery,
} from '@/types/DTO/productDTO';

export async function getRanking({ targetType, rankType }: RankingQuery): Promise<RankItemType[]> {
  const response = await apiClient.get<ProductDetailResponseDto>('/products/ranking', {
    params: {
      targetType: targetType,
      rankType: rankType,
    },
  });
  return response.data.data;
}

export async function getSummary({
  productId,
}: ProductSummaryRequestDTO): Promise<ProductSummaryResponseDTO> {
  const response = await apiClient.get<ProductSummaryResponseDTO>(`/products/${productId}/summary`);
  return response.data;
}
