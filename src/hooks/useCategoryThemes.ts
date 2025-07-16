import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Category } from '@/types/category';

interface UseCategoryThemesResult {
  themes: Category[] | null;
  isLoading: boolean;
  isError: boolean;
}

const fetchCategoryThemes = async (): Promise<Category[]> => {
  const res = await axios.get<{ data: Category[] }>(
    `${import.meta.env.VITE_API_BASE_URL}/api/themes`
  );
  return res.data.data;
};

export const useCategoryThemes = (): UseCategoryThemesResult => {
  const [themes, setThemes] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await fetchCategoryThemes();
        setThemes(data);
      } catch {
        setIsError(true);
        setThemes(null);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  return { themes, isLoading, isError };
};
