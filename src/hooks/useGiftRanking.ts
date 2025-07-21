import { useState, useEffect } from 'react';
import { fetchProductRanking, type Product } from '@/api/ranking';

type TargetType = 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
type RankType = 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';

interface UseGiftRankingProps {
  target: TargetType;
  rank: RankType;
}

interface UseGiftRankingReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const useGiftRanking = ({
  target,
  rank,
}: UseGiftRankingProps): UseGiftRankingReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      try {
        const data = await fetchProductRanking(target, rank);
        setProducts(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || '랭킹 데이터를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, [target, rank]);

  return { products, loading, error };
};

export default useGiftRanking;
