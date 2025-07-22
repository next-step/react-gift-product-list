import type { ThemeProduct } from "@/types/theme";
import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

export type fetchThemesProductsParams = {
  themeId: number;
  cursor?: number;
  limit?: number;
};

export type FetchThemesProductsResult = {
  list: ThemeProduct[];
  cursor: number;
  hasMoreList: boolean;
};

export const fetchThemesProducts = async ({
  themeId,
  cursor = 0,
  limit = 10,
}: fetchThemesProductsParams): Promise<FetchThemesProductsResult> => {
  return await axiosInstance.get(API_PATHS.THEMES_PRODUCTS(themeId), {
    params: {
      cursor,
      limit,
    },
  });
};
