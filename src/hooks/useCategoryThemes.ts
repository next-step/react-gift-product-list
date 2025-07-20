import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Category } from '@/types/category';
import { CATEGORY_THEMES_API_URL } from '@/constants/api';

const fetchCategoryThemes = async (): Promise<Category[]> => {
  const res = await axios.get<{ data: Category[] }>(CATEGORY_THEMES_API_URL);
  return res.data.data;
};

const useFetch = <T>(fetchFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      setPending(true);
      setError(false);
      try {
        const result = await fetchFn();
        setData(result);
      } catch {
        setError(true);
        setData(null);
      } finally {
        setPending(false);
      }
    };

    load();
  }, [fetchFn]);

  return { data, pending, error };
};

export const useCategoryThemes = () => useFetch(fetchCategoryThemes);
