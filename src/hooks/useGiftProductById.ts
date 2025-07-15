import { useQuery } from '@tanstack/react-query';
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
  return useQuery({
    queryKey: ['giftProduct', id],
    queryFn: () => fetchGiftProductById(id),
  });
};
