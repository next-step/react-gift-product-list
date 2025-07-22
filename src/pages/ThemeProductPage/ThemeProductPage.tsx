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
import type { ThemeInfo } from "@/types/ThemeInfo";
import { useRef, useState } from "react";
import ThemeProductsGrid from "./ThemeProductsGrid";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import { OBSERVER_OPTIONS } from "./constants/observer";

function ThemeProductsContent({ themeInfo }: { themeInfo: ThemeInfo }) {
  const loader = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<number>(0);

  const { data, isLoading: isThemeProductsLoading } = useFetch({
    fetchFn: () => getThemeProducts(Number(themeInfo.themeId), cursor),
    errorHandler: () => {
      console.error(THEME_PRODUCTS_API_MESSAGE.FETCH_ERROR);
    },
    deps: [cursor],
  });

  const { themeProducts } = useInfiniteScroll({
    data: data ?? { list: [], cursor: 0, hasMoreList: false },
    isLoading: isThemeProductsLoading,
    loaderRef: loader,
    setCursor,
    observerOptions: {
      threshold: OBSERVER_OPTIONS.THRESHOLD,
    },
  });

  return (
    <>
      <HeroSection backgroundColor={themeInfo?.backgroundColor || ""}>
        <HeroName>{themeInfo?.name}</HeroName>
        <HeroTitle>{themeInfo?.title}</HeroTitle>
        <HeroDescription>{themeInfo?.description}</HeroDescription>
      </HeroSection>
      <ThemeProductsGrid
        themeProducts={themeProducts}
        isThemeProductsLoading={isThemeProductsLoading}
        isLoaderRef={loader as React.RefObject<HTMLDivElement>}
      />
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
