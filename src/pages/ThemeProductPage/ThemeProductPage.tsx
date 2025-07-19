import { getThemeInfo, getThemeProducts } from "@/data/api";
import { useFetch } from "@/hooks/useFetch";
import Layout from "@/layout";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { LoadingContainer } from "../HomePage/components/Category/Category.styles";
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

const ProductListContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function ThemeProductPage() {
  const params = useParams();
  const navigate = useNavigate();

  const { data: themeInfo, isLoading: isThemeInfoLoading } = useFetch({
    fetchFn: () => getThemeInfo(Number(params.themeId)),
    errorHandler: () => {
      navigate(ROUTES.HOME);
    },
  });

  const { data: themeProducts, isLoading: isThemeProductsLoading } = useFetch({
    fetchFn: () => getThemeProducts(Number(params.themeId)),
    errorHandler: () => {
      console.error(THEME_PRODUCTS_API_MESSAGE.FETCH_ERROR);
    },
  });

  return (
    <Layout>
      {isThemeInfoLoading ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : (
        <>
          <HeroSection backgroundColor={themeInfo?.backgroundColor || ""}>
            <HeroName>{themeInfo?.name}</HeroName>
            <HeroTitle>{themeInfo?.title}</HeroTitle>
            <HeroDescription>{themeInfo?.description}</HeroDescription>
          </HeroSection>
          {isThemeProductsLoading ? (
            <LoadingContainer>
              <LoadingSpinner />
            </LoadingContainer>
          ) : (
            <ProductListContainer>
              <ProductsGrid
                products={themeProducts?.list || []}
                type={"themeProducts"}
              />
            </ProductListContainer>
          )}
        </>
      )}
    </Layout>
  );
}

export default ThemeProductPage;
