import { apiClient } from '@src/api/FetchData';
import type { HttpTypes } from '@src/api/HttpType';
import { URLS } from '@src/assets/urls';
import type { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams, type NavigateFunction } from 'react-router-dom';

type ThemeLabel = {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

export const useThemesProductLabel = (navigate: NavigateFunction) => {
  const { themeId } = useParams();
  const [label, setLabel] = useState<ThemeLabel | null>(null);

  useEffect(() => {
    const reqeustLabel = async () => {
      const apiReqeustParmas = {
        methods: 'GET' as HttpTypes,
        requestName: `themes/${themeId}/info`,
        body: {},
        params: '',
        headers: null,
      };
      try {
        const fetchData = await apiClient(apiReqeustParmas);
        setLabel(fetchData.data);
      } catch (error: unknown) {
        if ((error as AxiosError).status === 404) navigate(URLS.home);
      }
    };

    reqeustLabel();
  }, [themeId, navigate]);

  return {
    label,
  };
};
