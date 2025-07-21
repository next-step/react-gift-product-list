import API from './axiosInstance';
import type { ThemeInfo } from '@/types/themeInfo';

export const fetchThemes = () => API.get('/api/themes');

export const fetchThemeInfo = async (themeId: number): Promise<ThemeInfo> => {
  const res = await API.get(`/api/themes/${themeId}/info`);
  return res.data.data; 
};


export const fetchThemeProducts = async (
  themeId: number,
  cursor = 0,
  limit = 10
) => {
  const response = await API.get(`/api/themes/${themeId}/products`, {
    params: { cursor, limit },
  });
  return response.data.data; 
};