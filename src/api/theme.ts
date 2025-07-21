import apiClient from "@/api/apiClient";
import { PAGE_SIZE } from "@/constants/pagination";

export type Theme = {
  themeId: number;
  name: string;
  image: string;
};

export type ThemeInfo = {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

export type Product = {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

export type ThemeProductResponse = {
  list: Product[];
  cursor: number;
  hasMoreList: boolean;
};

export const fetchThemes = async (): Promise<Theme[]> => {
  return await apiClient.get("/themes");
};

export const fetchThemeInfo = async (themeId: number): Promise<ThemeInfo> => {
  return await apiClient.get(`/themes/${themeId}/info`);
};

export const fetchThemeProducts = async (
  themeId: number,
  cursor = 0,
  limit = PAGE_SIZE,
): Promise<ThemeProductResponse> => {
  return await apiClient.get(`/themes/${themeId}/products`, {
    params: { cursor, limit },
  });
};
