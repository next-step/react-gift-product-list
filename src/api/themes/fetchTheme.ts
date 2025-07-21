import { API_BASE_URL, apiClient } from '../apiClient';
import type { ThemeInfo } from '@/page/Home/hooks/useTheme';

interface ThemesResponse {
  data: ThemeInfo[];
}

const fetchTheme = async () => {
  const response = await apiClient.get<ThemesResponse>(`${API_BASE_URL}/api/themes`);
  return response.data.data;
};

export default fetchTheme;
