import apiClient from './index';
import type { ThemeResponse } from './types';

/**
 * 모든 테마 목록을 조회합니다.
 */
export const getThemes = async (): Promise<ThemeResponse> => {
  const response = await apiClient.get<ThemeResponse>('/api/themes');
  return response.data;
};

export default {
  getThemes,
};
