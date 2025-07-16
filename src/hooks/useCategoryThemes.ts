import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Category } from '@/types/category';

interface UseCategoryThemesResult {
  themes: Category[] | null;
  isLoading: boolean;
  isError: boolean;
}

export const useCategoryThemes = (): UseCategoryThemesResult => {
  const [themes, setThemes] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchThemes = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const res = await axios.get<{ data: Category[] }>(
          `${import.meta.env.VITE_API_BASE_URL}/api/themes`
        );
        setThemes(res.data.data);
      } catch (e) {
        setIsError(true);
        setThemes(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemes();
  }, []);

  return { themes, isLoading, isError };
};
