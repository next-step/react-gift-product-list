import { isAxiosError } from 'axios';
import { useApi } from '@/hooks/useApi';
import type { ThemeInfo } from '../ThemeHero/ThemeTypes';
import { api } from '@/lib/axios';

const fetchThemeInfo = async (themeId: number | null) => {
  if (!themeId) return null;

  try {
    const res = await api.get(`/themes/${themeId}/info`);
    return res.data.data;
  } catch (err: unknown) {
    if (isAxiosError(err) && err.response?.status === 404) {
      return null;
    }
    throw err;
  }
};

export const useThemeInfo = (themeId: number | null) => {
  const fetcher = () => fetchThemeInfo(themeId);
  const { data, loading, error } = useApi<ThemeInfo | null>(fetcher);

  return {
    themeInfo: data,
    loading,
    error,
  };
};
