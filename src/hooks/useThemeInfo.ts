import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getThemeInfoUrl } from '@/constants/api';
import { ROUTES } from '@/constants/routes';

export interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export const useThemeInfo = (themeId: string | undefined) => {
  const navigate = useNavigate();
  const [themeInfo, setThemeInfo] = useState<ThemeInfo | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!themeId) return;

    const fetchThemeInfo = async () => {
      try {
        const res = await axios.get<{ data: ThemeInfo }>(
          getThemeInfoUrl(themeId)
        );
        setThemeInfo(res.data.data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          navigate(ROUTES.NOT_FOUND);
        } else {
          setError(true);
        }
      }
    };

    fetchThemeInfo();
  }, [themeId, navigate]);

  return { themeInfo, error };
};
