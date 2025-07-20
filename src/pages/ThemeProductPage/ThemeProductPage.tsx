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
import { PRODUCT_GRID_TYPES } from "../../components/ProductCard/types/productGridTypes";
import type { ThemeInfo } from "@/types/ThemeInfo";
import { useEffect, useRef, useState } from "react";
import type { ThemeProduct } from "@/types/ThemeProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import { TRENDING_GIFTS_EMPTY_MESSAGES } from "../HomePage/components/TrendingGifts/constants/labels";
import {
  EmptyProductContainer,
  EmptyProductText,
} from "../HomePage/components/TrendingGifts/TrendingGiftsProductsGrid";

const Loader = styled.div`
  width: 100%;
  height: 50px;
  background-color: transparent;
`;

const ProductListContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProductGridContainer = styled.div`
  width: 95%;
  display: grid;
  grid-template-columns: ${({ theme }) => theme.layout.grid.columns.fixed3};
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

function ThemeProductsContent({ themeInfo }: { themeInfo: ThemeInfo }) {
  const loader = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<number>(0);
  const [themeProducts, setThemeProducts] = useState<ThemeProduct[]>([]);

  const { data, isLoading: isThemeProductsLoading } = useFetch({
    fetchFn: () => getThemeProducts(Number(themeInfo.themeId), cursor),
    errorHandler: () => {
      console.error(THEME_PRODUCTS_API_MESSAGE.FETCH_ERROR);
    },
    deps: [cursor],
  });

  useEffect(() => {
    if (data) {
      setThemeProducts((prev) => [...prev, ...data.list]);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && data?.hasMoreList) {
          setCursor(cursor + data?.list.length);
        }
      },
      {
        threshold: 0.5,
      }
    );

    const el = loader.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [isThemeProductsLoading, data?.hasMoreList]);

  return (
    <>
      <HeroSection backgroundColor={themeInfo?.backgroundColor || ""}>
        <HeroName>{themeInfo?.name}</HeroName>
        <HeroTitle>{themeInfo?.title}</HeroTitle>
        <HeroDescription>{themeInfo?.description}</HeroDescription>
      </HeroSection>
      <ProductListContainer>
        <ProductGridContainer>
          {themeProducts.length > 0 ? (
            <>
              {themeProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  imageURL={product.imageURL}
                  name={product.name}
                  brandName={product.brandInfo.name}
                  sellingPrice={product.price.sellingPrice}
                  index={idx}
                  type={PRODUCT_GRID_TYPES.TRENDING_GIFTS}
                />
              ))}
              {isThemeProductsLoading && <Loading />}
            </>
          ) : (
            <EmptyProductContainer>
              <EmptyProductText>
                {TRENDING_GIFTS_EMPTY_MESSAGES.NO_PRODUCT}
              </EmptyProductText>
            </EmptyProductContainer>
          )}
        </ProductGridContainer>
        <Loader ref={loader} />
      </ProductListContainer>
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
