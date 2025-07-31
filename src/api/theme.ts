import apiClient from '@/api/apiClient';

export interface ThemeInfo {
  title: string;
  name: string;
  description: string;
  imageUrl?: string;
  themeId: number;
  backgroundColor?: string;
}

export const fetchThemeInfo = async (themeId: string): Promise<ThemeInfo> => {
  const res = await apiClient.get(`/api/themes/${themeId}/info`);
  return res.data.data;
};
