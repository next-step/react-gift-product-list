import useApi from '@/apis/useApi';
import { API_URLS } from './constants';

export interface Product {
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
}

interface ThemeProductsResponse {
  data: {
    list: Product[];
    cursor: number;
    hasMoreList: boolean;
  };
}

export const useGetThemeProducts = (themeId: number) => {
  const { data, isLoading, error } = useApi<ThemeProductsResponse>(
    'get',
    API_URLS.THEME_PRODUCTS(themeId)
  );

  return { products: data?.data.list || [], isLoading, error };
};