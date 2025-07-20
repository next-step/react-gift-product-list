import { useEffect, useState } from 'react';
import { fetchThemeInfo } from '@/api/theme';
import type { ThemeInfo } from '@/api/theme';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function useThemeInfo(themeId: string) {
  const [themeInfo, setThemeInfo] = useState<ThemeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!themeId) return;

    const load = async () => {
      try {
        const res = await fetchThemeInfo(themeId);
        setThemeInfo(res.data);
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          navigate('/');
        } else {
          setError('테마 정보를 불러오는 데 실패했어요.');
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [themeId, navigate]);

  return { themeInfo, loading, error };
}
