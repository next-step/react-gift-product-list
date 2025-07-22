import { fetchProductRanking } from '@/api/ranking';
import {
  useFetch,
  type Product,
  type TargetType,
  type RankType,
} from './useFetch';

interface UseGiftRankingProps {
  target: TargetType;
  rank: RankType;
}

interface UseGiftRankingReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useGiftRanking = ({
  target,
  rank,
}: UseGiftRankingProps): UseGiftRankingReturn => {
  const { data, loading, error, refetch } = useFetch<Product[]>(
    fetchProductRanking,
    [target, rank],
    {
      initialData: [],
      errorMessage: '랭킹 데이터를 불러오지 못했습니다.',
    }
  );

  return {
    products: data || [],
    loading,
    error,
    refetch,
  };
};

export default useGiftRanking;
