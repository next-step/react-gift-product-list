import { apiClient } from '@src/api/FetchData';
import type { HttpTypes } from '@src/api/HttpType';
import { useCallback, useEffect, useRef, useState } from 'react';

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

export const useThemesProductItem = () => {
  const urlArray = new URL(window.location.href).pathname.split('/');
  const themeId = urlArray[urlArray.length - 1];

  const [products, setProducts] = useState<ThemeProducts | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadItem = async (isMore: boolean) => {
      const apiReqeustParmas = {
        methods: 'GET' as HttpTypes,
        requestName: `themes/${themeId}/products`,
        body: {},
        params: '',
        headers: null,
      };

      try {
        const fetchData = await apiClient(apiReqeustParmas);

        setProducts((prev) => {
          if (isMore && prev) {
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

        if (fetchData.data.list.length === 0 || !fetchData.data.hasMoreList) {
          setHasMore(false);
        } else {
          setPage((prev) => prev + 1);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          loadItem(true);
        }
      },
      { threshold: 1.0 }
    );

    const el = loader.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, themeId]);

  return { products, loader };
};
