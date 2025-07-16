import api from './index';

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

export const fetchProductRanking = async (
  targetType: string,
  rankType: string
): Promise<Product[]> => {
  const response = await api.get<{ data: Product[] }>('/api/products/ranking', {
    params: {
      targetType,
      rankType,
    },
  });
  return response.data.data;
};
