import API from './axiosInstance';

export const fetchThemes = () => API.get('/api/themes');

export const fetchThemeInfo = async (themeId: number) => {
  return await API.get(`/api/themes/${themeId}/info`);
};