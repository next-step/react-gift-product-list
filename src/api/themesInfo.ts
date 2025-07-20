import type { ThemesInfo } from "@/types/theme";
import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

type FetchThemesInfoParams = {
  themeId: number;
};

type FetchThemesInfoResult = ThemesInfo;

export const fetchThemesInfo = async (
  params: FetchThemesInfoParams,
): Promise<FetchThemesInfoResult> => {
  return await axiosInstance.get(API_PATHS.THEMES_INFO(params.themeId));
};
