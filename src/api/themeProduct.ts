import apiClient from '@/api/apiClient';

export interface Product {
  id: number;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

export interface ThemeProductsResponse {
  list: Product[];
  cursor: number;
  hasMoreList: boolean;
}

export const fetchThemeProducts = async (
  themeId: number,
  cursor: number = 0,
  limit: number = 10
): Promise<ThemeProductsResponse> => {
  const response = await apiClient.get(`/api/themes/${themeId}/products`, {
    params: { cursor, limit },
  });
  return response.data.data;
};
