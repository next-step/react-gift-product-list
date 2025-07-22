import useApiRequest from './useApiRequest';
import { fetchRanking } from '@/api/RankingApi';
import type { Product } from '@/types/Product';

export default function useGiftRanking(gender: string, type: string) {
  const {
    data: products,
    loading,
    error,
  } = useApiRequest<Product[], [string, string]>(fetchRanking, [gender, type]);

  return { products, loading, error };
}
