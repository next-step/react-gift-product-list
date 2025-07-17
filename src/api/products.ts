import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
import type { TargetType, RankType, Gift } from "@/types/gift";

export const fetchProductsRanking = async (
  targetType: TargetType,
  rankType: RankType,
): Promise<Gift[]> => {
  return await axiosInstance.get(API_PATHS.PRODUCTS_RANKING, {
    params: { targetType, rankType },
  });
};
