import { apiClient } from '@src/api/FetchData';
import type { HttpTypes } from '@src/api/HttpType';
import { useEffect, useState } from 'react';
type ThemeLabel = {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

type ThemeProducts = {
  data: {
    list: ThemeProduct[];
    cursor: number;
    hasMoreList: boolean;
  };
};
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
export const useThemesProduct = () => {
  const urlArray = new URL(window.location.href).pathname.split('/');
  const themeId = urlArray[urlArray.length - 1];
  const [label, setLabel] = useState<ThemeLabel | null>(null);
  const [products, setProducts] = useState<ThemeProducts | null>(null);

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
        console.log(fetchData);
        setLabel(fetchData.data);
      } catch (error) {
        return error;
      }
    };
    reqeustLabel();
  }, [themeId]);

  useEffect(() => {
    const reqeustThemeItem = async () => {
      const apiReqeustParmas = {
        methods: 'GET' as HttpTypes,
        requestName: `themes/${themeId}/products`,
        body: {},
        params: '',
        headers: null,
      };
      try {
        const fetchData = await apiClient(apiReqeustParmas);
        console.log(fetchData);
        setProducts(fetchData);
      } catch (error) {
        return error;
      }
    };
    reqeustThemeItem();
  }, [themeId]);

  return {
    label,
    products,
  };
};
