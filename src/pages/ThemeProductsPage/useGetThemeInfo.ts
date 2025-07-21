import useApi from '@/apis/useApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { isAxiosError } from 'axios';
import { PATH } from '@/constants/paths';
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

  const navigate = useNavigate();

  useEffect(() => {
    if (isAxiosError(error) && error.response?.status === 404) {
      navigate(PATH.HOME);
    }
  }, [error, navigate]);

  return { themeInfo: data?.data, isLoading, error };
};
