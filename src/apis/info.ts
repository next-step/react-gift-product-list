import axios from 'axios';

export type ThemeInfo = {
  themeId: number;
  name: string;
  title?: string;
  description?: string;
  backgroundColor?: string;
};

export const fetchThemeInfo = async (themeId: string): Promise<ThemeInfo> => {
  const response = await axios.get(`/api/themes/${themeId}/info`);
  return response.data.data;
};
