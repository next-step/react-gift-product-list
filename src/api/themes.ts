import apiClient from './index';
import type { ThemeResponse } from './types';
import type { Theme } from './types';

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

export default {
  getThemes,
};
