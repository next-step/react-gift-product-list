import axios from "axios";
import { END_POINTS } from "./endPoints";
import type { GiftThemeType } from "@/types/GiftThemeType";
import type { TrendingGiftsType } from "@/types/TrendingGiftsType";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getThemes = async (): Promise<GiftThemeType[]> => {
  const response = await apiClient.get(END_POINTS.THEMES);
  return response.data.data;
};

export const getTrendingGifts = async (
  targetType: string,
  rankType: string
): Promise<TrendingGiftsType[]> => {
  const response = await apiClient.get(END_POINTS.RANKING, {
    params: {
      targetType,
      rankType,
    },
  });
  return response.data.data;
};
