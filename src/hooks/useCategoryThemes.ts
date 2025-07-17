import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Category } from '@/types/category';
import { CATEGORY_THEMES_API_PATH } from '@/constants/api';

interface UseCategoryThemesResult {
  data: Category[] | null;
  pending: boolean;
  error: boolean;
}

const fetchCategoryThemes = async (): Promise<Category[]> => {
  const res = await axios.get<{ data: Category[] }>(
    `${import.meta.env.VITE_API_BASE_URL}${CATEGORY_THEMES_API_PATH}`
  );
  return res.data.data;
};

export const useCategoryThemes = (): UseCategoryThemesResult => {
  const [data, setData] = useState<Category[] | null>(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      setPending(true);
      setError(false);
      try {
        const result = await fetchCategoryThemes();
        setData(result);
      } catch {
        setError(true);
        setData(null);
      } finally {
        setPending(false);
      }
    };

    load();
  }, []);

  return { data, pending, error };
};
