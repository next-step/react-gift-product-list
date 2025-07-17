import axios from 'axios';
import { API_BASE_URL } from '../apiBaseUrl';

interface ThemeInfo {
  themeId: number;
  name: string;
  image: string;
}

interface ThemesResponse {
  data: ThemeInfo[];
}

const fetchTheme = async () => {
  const response = await axios.get<ThemesResponse>(`${API_BASE_URL}/api/themes`);
  return response.data.data;
};

export default fetchTheme;
