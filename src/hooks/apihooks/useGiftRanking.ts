import useApiRequest from '../useApiRequest';
import { fetchRanking } from '@/api/RankingApi';
import type { Product } from '@/types/Product';

export default function useGiftRanking(gender: string, type: string) {
  const fetchData = () => fetchRanking(gender, type);
  const {
    data: products,
    isLoading,
    hasError,
  } = useApiRequest<Product[]>(fetchData, [gender, type]);
  return { products, isLoading, hasError };
}
