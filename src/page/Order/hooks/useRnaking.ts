import fetchSummary from '@/api/products/productId/fetchSummary';
import { ROUTES } from '@/routes/routes';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export interface ProductSummaryData {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

const useRanking = (id: string) => {
  const navigate = useNavigate();
  const [productSummaryData, setProductSummaryData] = useState<ProductSummaryData>();

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const data = await fetchSummary(id);
        setProductSummaryData(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.data?.data?.statusCode;
          toast(
            status && status >= 400 && status < 500
              ? error.response?.data?.data?.message
              : '기타 에러 발생(서버 에러, 네트워크 에러 등)'
          );
          navigate(ROUTES.HOME);
          return;
        }
      }
    };
    dataFetch();
  }, [id]);

  return { productSummaryData };
};
export default useRanking;
