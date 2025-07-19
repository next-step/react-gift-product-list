import { api } from '@/Api/api';

export interface ProductRankingItem {
  id: number;
  name: string;
  price: { basicPrice: number; sellingPrice: number; discountRate: number };
  imageURL: string;
  brandInfo: { id: string; name: string; imageURL: string };
}

export interface ProductRankingResponse {
  data: ProductRankingItem[];
}

export const getProductRanking = (targetType: string, rankType: string) => {
  const url = `/api/products/ranking?targetType=${targetType}&rankType=${rankType}`;

  return api.get<ProductRankingResponse>(url);
};
