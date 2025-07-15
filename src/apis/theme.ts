import apiClient from '@/apis/apiClient';
import type { Themetype } from '@/types/DTO/themeDTO';

export async function getThemes(): Promise<Themetype[]> {
  const response = await apiClient.get<{ data: Themetype[] }>('/themes');
  return response.data.data;
}
