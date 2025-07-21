import apiClient from '@/api/apiClient';

export interface Category {
  themeId: number;
  name: string;
  image: string;
}

export const fetchThemes = async (): Promise<Category[]> => {
  const response = await apiClient.get<{ data: Category[] }>('/api/themes');
  return response.data.data;
};
