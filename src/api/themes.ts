import api from './index';

export interface Category {
  themeId: number;
  name: string;
  image: string;
}

export const fetchThemes = async (): Promise<Category[]> => {
  const response = await api.get<{ data: Category[] }>('/api/themes');
  return response.data.data;
};
