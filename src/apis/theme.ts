import apiClient from '@/apis/apiClient';
import type {
  Themetype,
  ThemeInfoResponseDTO,
  ThemeProductsResponseDTO,
} from '@/types/DTO/themeDTO';

export async function getThemes(): Promise<Themetype[]> {
  const response = await apiClient.get<{ data: Themetype[] }>('/themes');
  return response.data.data;
}

export async function getThemeInfo(themeId: number): Promise<ThemeInfoResponseDTO> {
  const response = await apiClient.get(`/themes/${themeId}/info`);
  return response.data.data;
}

export async function getThemeProducts(
  themeId: number,
  cursor: number,
  limit: number = 10
): Promise<ThemeProductsResponseDTO> {
  const response = await apiClient.get<{ data: ThemeProductsResponseDTO }>(
    `/themes/${themeId}/products`,
    { params: { cursor, limit } }
  );
  return response.data.data;
}
