import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
import type { GiftSummary } from "@/types/gift";

type FetchProductsSummaryParams = {
  productId: number;
};

type FetchProductsSummaryResult = GiftSummary;

export const fetchProductsSummary = async (
  params: FetchProductsSummaryParams,
): Promise<FetchProductsSummaryResult> => {
  return await axiosInstance.get(API_PATHS.PRODUCT_SUMMARY(params.productId), {
    params: { productId: params.productId },
  });
};
