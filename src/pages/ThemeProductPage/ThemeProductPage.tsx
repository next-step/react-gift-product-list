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
            <>
              {themeProducts?.list.length && themeProducts.list.length > 0 ? (
                <div>
                  {themeProducts.list.map((product) => (
                    <div key={product.id}>{product.name}</div>
                  ))}
                </div>
              ) : (
                <div>상품이 없습니다.</div>
              )}
            </>
          )}
        </>
      )}
    </Layout>
  );
}

export default ThemeProductPage;
