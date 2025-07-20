import { apiClient } from '@src/api/FetchData';
import { useEffect, useState } from 'react';
import type { Themes } from '../components/Home/PresentTheme/Item/ThemeType';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';

export const usePresentTheme = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [themes, setThemes] = useState<Themes>({
    data: [
      {
        themeId: 0,
        name: '',
        image: 'none',
      },
    ],
  });

  useEffect(() => {
    const fetchProductRanking = async () => {
      try {
        const data = await apiClient('GET', BASIC_ENDPOINT.theme, null, '', null);
        setThemes(data);
        setError(false);
      } catch (error) {
        console.error('Error fetching Product Ranking data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProductRanking();
  }, []);

  return {
    themes,
    isLoading,
    isError,
  };
};
