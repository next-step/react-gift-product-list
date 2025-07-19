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
      console.error("테마 상품 로딩 실패");
    },
  });

  if (isThemeInfoLoading || isThemeProductsLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  return (
    <Layout>
      <HeroSection backgroundColor={themeInfo?.backgroundColor || ""}>
        <HeroName>{themeInfo?.name}</HeroName>
        <HeroTitle>{themeInfo?.title}</HeroTitle>
        <HeroDescription>{themeInfo?.description}</HeroDescription>
      </HeroSection>
      {themeProducts?.list.length && themeProducts.list.length > 0 ? (
        <div>
          {themeProducts.list.map((product) => (
            <div key={product.id}>{product.name}</div>
          ))}
        </div>
      ) : (
        <div>상품이 없습니다.</div>
      )}
    </Layout>
  );
}

export default ThemeProductPage;
