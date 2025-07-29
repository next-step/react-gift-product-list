import { api } from './api';
import type { Theme, ThemeProductListResponse } from '@/types/theme';

export const getThemeInfo = async (themeId: number): Promise<Theme> => {
  const response = await api.get<{ data: Theme }>(`/themes/${themeId}/info`);
  return response.data.data;
};

export const getThemeProductList = async (
  themeId: number,
  cursor: number,
  limit: number,
): Promise<ThemeProductListResponse> => {
  const response = await api.get<{ data: ThemeProductListResponse }>(
    `/themes/${themeId}/products?cursor=${cursor}&limit=${limit}`,
  );
  return response.data.data;
};
