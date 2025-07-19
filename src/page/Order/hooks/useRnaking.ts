import fetchSummary from '@/api/products/productId/fetchSummary';
import { useEffect, useState } from 'react';

export interface ProductSummaryData {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

const useRanking = (id: string) => {
  const [productSummaryData, setProductSummaryData] = useState<ProductSummaryData>();

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const data = await fetchSummary(id);
        setProductSummaryData(data);
      } catch (error) {
        console.error(error);
      }
    };
    dataFetch();
  }, [id]);

  return { productSummaryData };
};
export default useRanking;
