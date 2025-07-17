import axios from 'axios';
import { API_BASE_URL } from '../apiBaseUrl';
import type { ThemeInfo } from '@/page/Home/hooks/useTheme';

interface ThemesResponse {
  data: ThemeInfo[];
}

const fetchTheme = async () => {
  const response = await axios.get<ThemesResponse>(`${API_BASE_URL}/api/themes`);
  return response.data.data;
};

export default fetchTheme;
