import fetchTheme from '@/api/themes/fetchTheme';
import { useEffect, useState } from 'react';

export interface ThemeInfo {
  themeId: number;
  name: string;
  image: string;
}

const useTheme = () => {
  const [themes, setThemes] = useState<ThemeInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTheme();
        setThemes(data);
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

export default useTheme;
