import axiosInstance from './axiosInstance';
import type { Theme } from '@/types/theme';

export const fetchThemes = async (): Promise<Theme[]> => {
  const res = await axiosInstance.get('/themes');
  return res.data.data;
};

export const fetchThemeDetail = async (themeId: number): Promise<Theme> => {
  const res = await axiosInstance.get(`/themes/${themeId}/info`);
  return res.data.data;
};
