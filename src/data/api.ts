import axios from "axios";
import { END_POINTS } from "./endPoints";
import type { GiftThemeType } from "@/types/GiftThemeType";
import type { TrendingGiftsType } from "@/types/TrendingGiftsType";
import type { User } from "@/types/User";
import type { ProductInfoSummary } from "@/types/ProductInfoSummary";
import type { Order } from "@/types/Order";
import type { ThemeInfo } from "@/types/ThemeInfo";
import type { ThemeProducts } from "@/types/ThemeProducts";

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

export const getUserInfo = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await apiClient.post(END_POINTS.LOGIN, {
    email,
    password,
  });
  return response.data.data;
};

export const getProductInfo = async (
  id: string
): Promise<ProductInfoSummary> => {
  const response = await apiClient.get(
    END_POINTS.PRODUCT_INFO.replace(":id", id)
  );
  return response.data.data;
};

export const createOrder = async (authToken: string, order: Order) => {
  const response = await apiClient.post(END_POINTS.ORDER, order, {
    headers: {
      Authorization: authToken,
    },
  });
  return response.data.data;
};

export const getThemeInfo = async (themeId: number): Promise<ThemeInfo> => {
  const response = await apiClient.get(
    END_POINTS.THEME_INFO.replace(":themeId", themeId.toString())
  );
  return response.data.data;
};

export const getThemeProducts = async (
  themeId: number
): Promise<ThemeProducts> => {
  const response = await apiClient.get(
    END_POINTS.THEME_PRODUCTS.replace(":themeId", themeId.toString())
  );
  return response.data.data;
};
