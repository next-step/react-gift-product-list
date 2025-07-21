import apiClient from "@/api/apiClient";
import type { Product } from "@/types/product";

export type ProductSummary = {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
};

export type TargetType = "ALL" | "FEMALE" | "MALE" | "TEEN";
export type RankType = "MANY_WISH" | "MANY_RECEIVE" | "MANY_WISH_RECEIVE";

export const fetchProductRanking = (
  targetType: TargetType = "ALL",
  rankType: RankType = "MANY_WISH",
): Promise<Product[]> => {
  return apiClient.get(`/products/ranking`, {
    params: {
      targetType,
      rankType,
    },
  });
};

export const fetchProductById = (productId: number): Promise<Product> => {
  return apiClient.get(`/products/${productId}`);
};

export const fetchProductSummary = (
  productId: number,
): Promise<ProductSummary> => {
  return apiClient.get(`/products/${productId}/summary`);
};
