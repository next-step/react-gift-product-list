import axiosInstance from "./axiosInstance";
import type { TargetType, RankType } from "@/types/gift";

export const fetchProductsRanking = async (
  targetType: TargetType,
  rankType: RankType,
) => {
  const response = await axiosInstance.get("/api/products/ranking", {
    params: { targetType, rankType },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch product ranking");
  }
  return response.data;
};
