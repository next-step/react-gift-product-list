import { apiClient } from '@src/api/FetchData';
import type { HttpTypes } from '@src/api/HttpType';
import { URLS } from '@src/assets/urls';
import type { Good } from '@src/types/Goods';
import type { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useParams, type NavigateFunction } from 'react-router-dom';

type FetchDataType = {
  data: {
    list: Good[];
    cursor: number;
    hasMoreList: boolean;
  };
};

export const useThemesProductItem = (navigate: NavigateFunction) => {
  const { themeId } = useParams();
  const [goods, setGoods] = useState<Good[] | null>(null);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);

  const loadItem = useCallback(async () => {
    if (!hasMore) return;
    const apiReqeustParmas = {
      methods: 'GET' as HttpTypes,
      requestName: `themes/${themeId}/products`,
      body: {},
      params: `?cursor=${cursor}`,
      headers: null,
    };
    try {
      const fetchData = (await apiClient(apiReqeustParmas)) as FetchDataType;
      setGoods((prev) => {
        if (prev) {
          return [...prev, ...fetchData.data.list];
        } else {
          return fetchData.data.list;
        }
      });
      setError(false);
      if (fetchData.data.hasMoreList) {
        setCursor(fetchData.data.cursor);
      } else {
        setHasMore(false);
      }
    } catch (error: unknown) {
      setError(true);
      if ((error as AxiosError).status === 404) navigate(URLS.home);
    } finally {
      setLoading(false);
    }
  }, [cursor, hasMore, themeId, navigate]);

  return {
    goods,
    isLoading,
    isError,
    loadItem,
    hasMore,
  };
};
