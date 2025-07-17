import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
import type { GiftSummary } from "@/types/gift";

export const fetchProductsSummary = async (
  productId: number,
): Promise<GiftSummary> => {
  return await axiosInstance.get(API_PATHS.PRODUCT_SUMMARY(productId), {
    params: { productId },
  });
};
