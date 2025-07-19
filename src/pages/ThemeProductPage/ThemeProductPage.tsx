import { getThemeInfo, getThemeProducts } from "@/data/api";
import { useFetch } from "@/hooks/useFetch";
import Layout from "@/layout";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "@/components/Loading/Loading";
import {
  HeroDescription,
  HeroName,
  HeroSection,
  HeroTitle,
} from "./HeroSection";
import { ROUTES } from "@/constants/routes";
import { THEME_PRODUCTS_API_MESSAGE } from "./constants/apiMessage";
import styled from "@emotion/styled";
import ProductsGrid from "../HomePage/components/ProductsGrid/ProductsGrid";
import { PRODUCT_GRID_TYPES } from "../HomePage/components/ProductsGrid/types/productGridTypes";
import type { ThemeInfo } from "@/types/ThemeInfo";

const ProductListContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function ThemeProductsContent({ themeInfo }: { themeInfo: ThemeInfo }) {
  const { data: themeProducts, isLoading: isThemeProductsLoading } = useFetch({
    fetchFn: () => getThemeProducts(Number(themeInfo.themeId)),
    errorHandler: () => {
      console.error(THEME_PRODUCTS_API_MESSAGE.FETCH_ERROR);
    },
  });

  return (
    <>
      <HeroSection backgroundColor={themeInfo?.backgroundColor || ""}>
        <HeroName>{themeInfo?.name}</HeroName>
        <HeroTitle>{themeInfo?.title}</HeroTitle>
        <HeroDescription>{themeInfo?.description}</HeroDescription>
      </HeroSection>
      {isThemeProductsLoading ? (
        <Loading />
      ) : (
        <ProductListContainer>
          <ProductsGrid
            products={themeProducts?.list || []}
            type={PRODUCT_GRID_TYPES.THEME_PRODUCTS}
          />
        </ProductListContainer>
      )}
    </>
  );
}

function ThemeProductPage() {
  const params = useParams();
  const navigate = useNavigate();

  const { data: themeInfo, isLoading: isThemeInfoLoading } = useFetch({
    fetchFn: () => getThemeInfo(Number(params.themeId)),
    errorHandler: () => {
      navigate(ROUTES.HOME);
    },
  });

  return (
    <Layout>
      {isThemeInfoLoading ? (
        <Loading />
      ) : (
        themeInfo && <ThemeProductsContent themeInfo={themeInfo} />
      )}
    </Layout>
  );
}

export default ThemeProductPage;
