import { requests } from '@/api/requests';
import type { FilterId, GenerationId } from '@/data/categoryDatas';
import { useEffect, useState } from 'react';

interface BrandInfo {
  id: number;
  name: string;
  imageURL: string;
}

interface PriceInfo {
  basicPrice: number;
  sellingPrice: number;
  discountRate: number;
}

export interface GiftRankingItem {
  id: number;
  name: string;
  price: PriceInfo;
  imageURL: string;
  brandInfo: BrandInfo;
}

export interface RankingApiProps {
  activeGenerationButton: GenerationId;
  activeFilterButton: FilterId;
}

const useRanking = ({ activeGenerationButton, activeFilterButton }: RankingApiProps) => {
  const [rankingDatas, setRankingDatas] = useState<GiftRankingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await requests.fetchRanking({ activeGenerationButton, activeFilterButton });
        setRankingDatas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeGenerationButton, activeFilterButton]);

  return { rankingDatas, loading };
};

export default useRanking;
