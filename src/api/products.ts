import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
import type { TargetType, RankType, Gift } from "@/types/gift";

type FetchProductsRankingParams = {
  targetType: TargetType;
  rankType: RankType;
};

type FetchProductsRankingResult = Gift[];

export const fetchProductsRanking = async (
  params: FetchProductsRankingParams,
): Promise<FetchProductsRankingResult> => {
  return await axiosInstance.get(API_PATHS.PRODUCTS_RANKING, { params });
};
