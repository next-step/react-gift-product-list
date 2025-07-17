import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../apiBaseUrl';

interface ThemeInfo {
  themeId: number;
  name: string;
  image: string;
}

interface ThemesResponse {
  data: ThemeInfo[];
}

const useThemeApi = () => {
  const [themes, setThemes] = useState<ThemeInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ThemesResponse>(`${API_BASE_URL}/api/themes`);
        const { data } = response;
        setThemes(data.data);
      } catch (error) {
        setError(true);
        console.error('Error fetching themes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { themes, loading, error };
};

export default useThemeApi;
