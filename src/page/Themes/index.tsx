import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CardSection from './components/CardSection';
import GridSection from './components/GridSection';
import { API_BASE_URL } from '@/api/apiClient';

interface BrandInfo {
  id: number;
  name: string;
  imageURL: string;
}

interface Price {
  basicPrice: number;
  sellingPrice: number;
  discountRate: number;
}

interface Item {
  id: number;
  name: string;
  price: Price;
  imageURL: string;
  brandInfo: BrandInfo;
}

export interface ThemeProductsData {
  list: Item[];
  cursor: number;
  hasMoreList: boolean;
}

export interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  // backgroundColor: string;
}

const ThemesPage = () => {
  const { id } = useParams<{ id: string }>();

  const [themeInfo, setThemeInfo] = useState<ThemeInfo>();
  const [themeProducts, setThemeProducts] = useState<ThemeProductsData>();
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const infoResponse = await axios(`${API_BASE_URL}/api/themes/${id}/info`);
        const productsResponse = await axios(`${API_BASE_URL}/api/themes/${id}/products`);
        setThemeInfo(infoResponse.data.data);
        setThemeProducts(productsResponse.data.data);
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

  return (
    <Container>
      <CardSection themeInfo={themeInfo} />
      <GridSection themeProducts={themeProducts} />
    </Container>
  );
};
export default ThemesPage;

const Container = styled.section`
  width: 100%;
  height: 100%;
`;
