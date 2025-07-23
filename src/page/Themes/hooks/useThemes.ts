import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { ThemeIdInfoData, ThemeIdProductsData } from '..';
import axios from 'axios';
import { toast } from 'react-toastify';
import { requests } from '@/api/requests';

const useThemes = () => {
  const { id } = useParams<{ id: string }>();

  const [themeIdInfo, setThemeIdInfo] = useState<ThemeIdInfoData>();
  const [themeIdProducts, setThemeIdProducts] = useState<ThemeIdProductsData>();

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const infoResponse = await requests.fetchThemeIdInfo(Number(id));
        const productsResponse = await requests.fetchThemeIdProducts(Number(id));
        setThemeIdInfo(infoResponse);
        setThemeIdProducts(productsResponse);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.data?.data?.statusCode;
          toast(
            status && status === 404
              ? error.response?.data?.data?.message
              : '기타 에러 발생(서버 에러, 네트워크 에러 등)'
          );
        }
      }
    };
    fetchData();
  }, [id]);

  return { themeIdInfo, themeIdProducts };
};
export default useThemes;
