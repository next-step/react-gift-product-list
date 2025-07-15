import { useEffect, useState } from 'react';
import { type Product } from '@/types';

// API 호출 함수 (내부에서만 사용)
const API_BASE = import.meta.env.VITE_API_BASE_URL;
async function fetchRanking(targetType: string, rankType: string): Promise<Product[]> {
  const res = await fetch(
    `${API_BASE}/api/products/ranking?targetType=${targetType}&rankType=${rankType}`,
  );
  if (!res.ok) throw new Error('랭킹 불러오기 실패');
  const data = await res.json();
  return data.data;
}

// 커스텀 훅
export function useRanking(targetType: string, rankType: string) {
  const [ranking, setRanking] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchRanking(targetType, rankType)
      .then(setRanking)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [targetType, rankType]);

  return { ranking, loading, error };
}
