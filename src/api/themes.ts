import apiClient from './index';
import type { ThemeResponse } from './types';
import type { Theme } from './types';
import type { Product } from './types';

export interface ThemeProductsResponse {
  list: Product[];
  cursor: number;
  hasMoreList: boolean;
}

/**
 * 모든 테마 목록을 조회합니다.
 */
export const getThemes = async (): Promise<ThemeResponse> => {
  const response = await apiClient.get<ThemeResponse>('/api/themes');
  return response.data;
};

/**
 * themeId로 단일 테마 정보를 조회합니다.
 */
export const getThemeInfo = async (
  themeId: string | number
): Promise<Theme> => {
  const response = await apiClient.get<{ data: Theme }>(
    `/api/themes/${themeId}/info`
  );
  return response.data.data;
};

/**
 * themeId로 테마 상품 리스트를 조회합니다.
 */
export const getThemeProducts = async (
  themeId: string | number,
  cursor?: number
): Promise<ThemeProductsResponse> => {
  const params = cursor !== undefined ? { cursor } : undefined;
  const response = await apiClient.get<{ data: ThemeProductsResponse }>(
    `/api/themes/${themeId}/products`,
    { params }
  );
  return response.data.data;
};

export default {
  getThemes,
};
