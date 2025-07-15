import { useEffect, useState } from 'react';
import type { CategoryTheme } from '@/types';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const useFetchThemes = () => {
  const [themes, setThemes] = useState<CategoryTheme[]>([]);
  const [themesLoading, setThemesLoading] = useState(true);
  const [themesError, setThemesError] = useState(false);

  useEffect(() => {
    setThemesLoading(true);
    setThemesError(false);
    axios(`${API_BASE}/api/themes`)
      .then(({ data }) => setThemes(data.data))
      .catch(() => setThemesError(true))
      .finally(() => setThemesLoading(false));
  }, []);

  return { themes, themesLoading, themesError };
};
