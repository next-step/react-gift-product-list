import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
import type { Theme } from "@/types/theme";

export const fetchTheme = async (): Promise<Theme[]> => {
  return await axiosInstance.get(API_PATHS.THEMES);
};
