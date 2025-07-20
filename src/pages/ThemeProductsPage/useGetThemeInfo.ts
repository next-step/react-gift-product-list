import useApi from '@/apis/useApi';
import { API_URLS } from './constants';

interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export const useGetThemeInfo = (themeId: number) => {
  const { data, isLoading, error } = useApi<{ data: ThemeInfo }>(
    'get', API_URLS.THEME_INFO(themeId),
  );

  return { themeInfo: data?.data, isLoading, error };
};
