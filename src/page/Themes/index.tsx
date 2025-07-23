import styled from '@emotion/styled';
import CardSection from './components/CardSection';
import GridSection from './components/GridSection';
import useThemes from './hooks/useThemes';

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

export interface ThemeIdProductsData {
  list: Item[];
  cursor: number;
  hasMoreList: boolean;
}

export interface ThemeIdInfoData {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

const ThemesPage = () => {
  const { themeIdInfo, themeIdProducts } = useThemes();

  return (
    <Container>
      <CardSection themeIdInfo={themeIdInfo} />
      <GridSection themeIdProducts={themeIdProducts} />
    </Container>
  );
};
export default ThemesPage;

const Container = styled.section`
  width: 100%;
  height: 100%;
`;
