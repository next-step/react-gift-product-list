import { useEffect, useState } from 'react';
import type { GiftItem } from '../types/GiftItem';

const BASE_URL = 'http://localhost:3000';

export const fetchGiftProductById = async (
  id: number
): Promise<GiftItem> => {
  const res = await fetch(`${BASE_URL}/api/products/ranking`);
  if (!res.ok) throw new Error('상품 데이터를 불러오지 못했습니다.');

  const data = await res.json();
  const product = data?.data?.find(
    (item: GiftItem) => item.id === id
  );
  if (!product) throw new Error('해당 상품이 존재하지 않습니다.');

  return product;
};

export const useGiftProductById = (id: number) => {
  const [data, setData] = useState<GiftItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id == null) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const product = await fetchGiftProductById(id);
        setData(product);
      } catch (err: any) {
        setError(err.message || '알 수 없는 오류');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { data, loading, error };
};
