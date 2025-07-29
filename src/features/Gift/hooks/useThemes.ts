import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';

interface Theme {
  themeId: number;
  name: string;
  image: string;
}

export const useThemes = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchThemes = async () => {
      setLoading(true);
      setError(false);

      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const response = await api.get('/themes');
        setThemes(response.data.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchThemes();
  }, []);

  return { themes, loading, error };
};
