import api from '@/lib/axiosInstance';

export const fetchCategories = async () => {
  return await api.get('/themes').then((res) => res.data.data);
};
//theme 상세페이지
export const fetchthemeInfo = async (themeId: number) => {
  return await api
    .get(`themes/${themeId}/info`)
    .then((res) => res.data.data);
};
export const fetchThemeProducts = async (themeId: number, cursor: number, limit: number) => {
  return await api
    .get(`/themes/${themeId}/products`, {
      params: {
        cursor,
        limit,
      },
    })
    .then((res) => res.data.data);
};
