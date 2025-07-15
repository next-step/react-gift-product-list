import { useEffect, useState } from 'react';
import type { Category } from '@/types/category';

export const useCategoryThemes = () => {
  const [themes, setThemes] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/themes`
        );
        const json = await res.json();
        setThemes(json.data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemes();
  }, []);

  return { themes, isLoading, isError };
};
