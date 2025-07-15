import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../apiBaseUrl';

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

interface GiftRankingItem {
  id: number;
  name: string;
  price: PriceInfo;
  imageURL: string;
  brandInfo: BrandInfo;
}

interface RankingApiProps {
  activeGenerationButton: string;
  activeFilterButton: string;
}

const RankingApi = ({ activeGenerationButton, activeFilterButton }: RankingApiProps) => {
  const [rankingDatas, setrankingDatas] = useState<GiftRankingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/products/ranking?targetType=${activeGenerationButton}&rankType=${activeFilterButton}`
        );
        const { data } = response;
        setrankingDatas(data.data);
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

export default RankingApi;
