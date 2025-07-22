import useFetchData from '@/hooks/fetch/useFetchData.ts';
import { THEMES_INFO } from '@/api/api.ts';

interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export default function useFetchThemesInfo(themesId: number) {
  const url = THEMES_INFO(themesId);
  const { data: themeInfo, loading, error, statusCode } = useFetchData<ThemeInfo>(url);

  return {
    themeInfo,
    loading,
    error,
    statusCode,
  };
}
