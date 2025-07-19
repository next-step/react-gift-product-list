import { getThemeInfo, getThemeProducts } from "@/data/api";
import { useFetch } from "@/hooks/useFetch";
import Layout from "@/layout";
import { useNavigate, useParams } from "react-router-dom";
import { THEME_INFO_API_MESSAGE } from "./constants/apiMessage";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { LoadingContainer } from "../HomePage/components/Category/Category.styles";
import {
  HeroDescription,
  HeroName,
  HeroSection,
  HeroTitle,
} from "./HeroSection";

function ThemeProductPage() {
  const params = useParams();

  const { data: themeInfo, isLoading: isThemeInfoLoading } = useFetch({
    fetchFn: () => getThemeInfo(Number(params.themeId)),
    errorHandler: () => {
      console.error(THEME_INFO_API_MESSAGE.FETCH_ERROR);
    },
  });

  const {
    data: themeProducts,
    isLoading: isThemeProductsLoading,
    isError: isThemeProductsError,
  } = useFetch({
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
      {themeProducts?.list.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </Layout>
  );
}

export default ThemeProductPage;
