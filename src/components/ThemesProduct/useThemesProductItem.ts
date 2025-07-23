import { apiClient } from '@src/api/FetchData';
import type { HttpTypes } from '@src/api/HttpType';
import { URLS } from '@src/assets/urls';
import type { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useParams, type NavigateFunction } from 'react-router-dom';

type ThemeProduct = {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

type ThemeProducts = {
  data: {
    list: ThemeProduct[];
    cursor: number;
    hasMoreList: boolean;
  };
};

export const useThemesProductItem = (navigate: NavigateFunction) => {
  const { themeId } = useParams();
  const [products, setProducts] = useState<ThemeProducts | null>(null);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);

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
      const fetchData = await apiClient(apiReqeustParmas);
      setProducts((prev) => {
        if (prev) {
          return {
            data: {
              list: [...prev.data.list, ...fetchData.data.list],
              cursor: fetchData.data.cursor,
              hasMoreList: fetchData.data.hasMoreList,
            },
          };
        } else {
          return fetchData;
        }
      });

      if (fetchData.data.hasMoreList) {
        setCursor(fetchData.data.cursor);
      } else {
        setHasMore(false);
      }
    } catch (error: unknown) {
      if ((error as AxiosError).status === 404) navigate(URLS.home);
    }
  }, [cursor, hasMore, themeId, navigate]);

  return {
    products,
    loadItem,
    hasMore,
  };
};
