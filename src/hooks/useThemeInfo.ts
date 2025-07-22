import { useEffect, useState } from 'react';
import type { ThemeInfo } from '../types/GiftTheme';
import { fetchThemeInfo } from '../api/themeInfo';

export const useThemeInfo = (themeId: number) => {
  const [data, setData] = useState<ThemeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!themeId) return;

    const getThemeInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchThemeInfo(themeId);
        setData(res);
      } catch (err: any) {
        setError(err.message || '테마 정보를 불러오는 중 오류 발생');
      } finally {
        setLoading(false);
      }
    };

    getThemeInfo();
  }, [themeId]);

  return { data, loading, error };
};
