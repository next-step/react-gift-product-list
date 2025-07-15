import { useQuery } from '@tanstack/react-query';
import type { GiftItem } from '../types/GiftItem';

const BASE_URL = 'http://localhost:3000';

export const useGiftRanking = (filter: string, tab: string) => {
  return useQuery<GiftItem[]>({
    queryKey: ['giftRanking', filter, tab],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/api/products/ranking?filter=${filter}&tab=${tab}`
      );
      if (!res.ok) throw new Error('데이터 불러오기 실패');
      const json = await res.json();
      return json.data;
    },
  });
};
