import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
import type { Theme } from "@/types/theme";

type FetchThemeResult = Theme[];

export const fetchTheme = async (): Promise<FetchThemeResult> => {
  return await axiosInstance.get(API_PATHS.THEMES);
};
