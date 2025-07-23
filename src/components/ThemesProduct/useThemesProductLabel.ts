import { apiClient } from '@src/api/FetchData';
import type { HttpTypes } from '@src/api/HttpType';
import { URLS } from '@src/assets/urls';
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
        if (fetchData.data.statusCode === 404) {
          navigate(URLS.home);
        } else {
          setLabel(fetchData.data);
        }
      } catch (error) {
        return error;
      }
    };

    reqeustLabel();
  }, [themeId, navigate]);

  return {
    label,
  };
};
