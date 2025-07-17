import { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse>(
          `/api/products/ranking?targetType=${targetType}&rankType=${rankType}`
        );
        setProducts(response.data.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRanking();
  }, [targetType, rankType]);

  return { products, isLoading, error };
};

export default useGetRanking;
