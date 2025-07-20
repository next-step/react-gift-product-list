import type { ThemesProduct } from "@/types/theme";
import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

type fetchThemesProductsParams = {
  themeId: number;
  cursor?: number;
  limit?: number;
};

type FetchThemesProductsResult = {
  list: ThemesProduct[];
  cursor: number;
  hasMoreList: boolean;
};

export const fetchThemesProducts = async ({
  themeId,
  cursor = 0,
  limit = 20,
}: fetchThemesProductsParams): Promise<FetchThemesProductsResult> => {
  return await axiosInstance.get(API_PATHS.THEMES_PRODUCTS(themeId), {
    params: {
      cursor,
      limit,
    },
  });
};
