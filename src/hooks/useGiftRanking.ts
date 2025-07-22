import { useEffect, useState } from 'react';
import type { GiftItem } from '../types/GiftItem';

const BASE_URL = 'http://localhost:3000';

export const useGiftRanking = (filter: string, tab: string) => {
  const [data, setData] = useState<GiftItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGiftRanking = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${BASE_URL}/api/products/ranking?filter=${filter}&tab=${tab}`
        );
        if (!res.ok) throw new Error('데이터 불러오기 실패');
        const json = await res.json();
        setData(json.data);
      } catch (err: any) {
        setError(err.message || '알 수 없는 오류');
      } finally {
        setLoading(false);
      }
    };

    fetchGiftRanking();
  }, [filter, tab]);

  return { data, loading, error };
};
