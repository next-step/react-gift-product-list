import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';

export interface Price {
  basicPrice: number;
  discountRate: number;
  sellingPrice: number;
}

export interface BrandInfo {
  id: number;
  name: string;
  imageURL: string;
}

export interface Product {
  id: number;
  name: string;
  imageURL: string;
  price: Price;
  brandInfo: BrandInfo;
}

export type Gender = 'All' | '남성이' | '여성이' | '청소년이';
export type Type = '받고 싶어한' | '많이 선물한' | '위시로 받은';

const genderMap: Record<Gender, string> = {
  All: 'ALL',
  남성이: 'MALE',
  여성이: 'FEMALE',
  청소년이: 'TEEN',
};

const typeMap: Record<Type, string> = {
  '받고 싶어한': 'MANY_WISH',
  '많이 선물한': 'MANY_RECEIVE',
  '위시로 받은': 'MANY_WISH_RECEIVE',
};

export const useProductsRanking = (gender: Gender, type: Type) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductsRanking = async () => {
      setLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const response = await api.get('/products/ranking', {
          params: {
            targetType: genderMap[gender],
            rankType: typeMap[type],
          },
        });
        setProducts(response.data.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('에러가 발생하였습니다.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProductsRanking();
  }, [gender, type]);

  return { products, loading, error };
};
