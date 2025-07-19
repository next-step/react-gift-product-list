import useApi from '@/apis/useApi';
import type { CategoryValue, SortValue } from './constants';

type Product = {
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

type ApiResponse = {
  data: Product[];
};

const useGetRanking = (targetType: CategoryValue, rankType: SortValue) => {
  const { data, isLoading, error } = useApi<ApiResponse>(
    'get',
    `/products/ranking?targetType=${targetType}&rankType=${rankType}`,
  );

  return { products: data?.data || [], isLoading, error };
};

export default useGetRanking;
