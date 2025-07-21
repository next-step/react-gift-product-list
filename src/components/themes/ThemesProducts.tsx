import styled from "@emotion/styled";
import { fetchThemesProducts } from "@/api/themesProducts";
import useApiRequest from "@/hooks/useApiRequest";
import { useCallback, useEffect, useRef, useState } from "react";
import ThemesItem from "./ThemesItem";
import { Link } from "react-router";
import { ROUTE_PATH } from "@/routes/paths";
import BoxMessage from "../common/BoxMessage";
import type { ThemesProduct } from "@/types/theme";
import LoadingSpinner from "../common/LoadingSpinner";

type ThemesProductsProps = {
  id: string | undefined;
};

const ThemesProducts = ({ id }: ThemesProductsProps) => {
  const [items, setItems] = useState<ThemesProduct[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  const requestFn = useCallback(
    () => fetchThemesProducts({ themeId: Number(id), cursor, limit: 20 }),
    [id, cursor],
  );
  const {
    data: themeProductsData,
    isError,
    isLoading,
    refetch,
  } = useApiRequest({
    requestFn,
    immediate: false,
  });

  useEffect(() => {
    if (themeProductsData && !isLoading && !isError) {
      setItems(prev => [...prev, ...themeProductsData.list]);
      setCursor(themeProductsData.cursor);
      setHasMore(themeProductsData.hasMoreList);
    }
  }, [themeProductsData, isLoading, isError]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          refetch();
        }
      },
      { threshold: 1.0 },
    );

    const el = loader.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [loader, hasMore, refetch]);

  if (!themeProductsData && !isLoading && isError) {
    return null;
  }

  return (
    <ProductsSection>
      {items?.length > 0 && (
        <ProductsGrid>
          {items.map(product => (
            <Link
              to={ROUTE_PATH.ORDER.replace(":id", String(product.id))}
              key={product.id}
            >
              <ThemesItem product={product} />
            </Link>
          ))}
        </ProductsGrid>
      )}
      {isLoading && <LoadingSpinner height="40px" />}
      {items?.length === 0 && !isLoading && !themeProductsData && (
        <BoxMessage message="상품이 없습니다." height="240px" />
      )}
      <div ref={loader} style={{ height: "20px" }} />
    </ProductsSection>
  );
};

export default ThemesProducts;

const ProductsSection = styled.section`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => `${theme.spacing.spacing6} ${theme.spacing.spacing2}`};
`;
