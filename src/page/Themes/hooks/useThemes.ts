import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ThemeIdInfoData, ThemeIdProductsData } from '..';
import axios from 'axios';
import { requests } from '@/api/requests';
import { ROUTES } from '@/routes/Routes';

const useThemes = () => {
  const { id } = useParams<{ id: string }>();
  const index = Number(id);
  const navigate = useNavigate();

  const [themeIdInfo, setThemeIdInfo] = useState<ThemeIdInfoData>();
  const [themeIdProducts, setThemeIdProducts] = useState<ThemeIdProductsData>();

  useEffect(() => {
    if (!index) return;
    const fetchData = async () => {
      try {
        const infoResponse = await requests.fetchThemeIdInfo(index);
        const productsResponse = await requests.fetchThemeIdProducts(index);
        setThemeIdInfo(infoResponse);
        setThemeIdProducts(productsResponse);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status === 404) {
            navigate(ROUTES.HOME);
          }
        }
      }
    };
    fetchData();
  }, [index]);

  return { themeIdInfo, themeIdProducts };
};
export default useThemes;
