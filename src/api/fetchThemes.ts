import { useEffect, useState } from 'react';
import type { CategoryTheme } from '@/types';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const useFetchThemes = () => {
  const [themes, setThemes] = useState<CategoryTheme[]>([]);
  const [themesLoading, setThemesLoading] = useState(true);
  const [themesError, setThemesError] = useState(false);

  useEffect(() => {
    setThemesLoading(true);
    setThemesError(false);
    fetch(`${API_BASE}/api/themes`)
      .then((res) => res.json())
      .then((data) => setThemes(data.data))
      .catch(() => setThemesError(true))
      .finally(() => setThemesLoading(false));
  }, []);

  return { themes, themesLoading, themesError };
};
