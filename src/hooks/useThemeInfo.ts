import { useEffect } from 'react';
import { fetchThemeInfo } from '@/api/theme';
import type { ThemeInfo } from '@/api/theme';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';

export function useThemeInfo(themeId: string) {
  const navigate = useNavigate();
  const {
    data: themeInfo,
    loading,
    error,
  } = useFetch<ThemeInfo>(fetchThemeInfo, [themeId], {
    errorMessage: '테마 정보를 불러오는 데 실패했어요.',
  });

  useEffect(() => {
    if (error) {
      navigate('/');
    }
  }, [error, navigate]);

  return { themeInfo, loading, error };
}
