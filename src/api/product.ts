import apiClient from "./apiClient";

export type Product = {
  id: number;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
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
