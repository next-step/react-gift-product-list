import styled from "@emotion/styled";
import { fetchThemesProducts } from "@/api/themesProducts";
import ThemesItem from "./ThemesItem";
import { Link } from "react-router";
import { ROUTE_PATH } from "@/routes/paths";
import BoxMessage from "../common/BoxMessage";
import type { ThemeProduct } from "@/types/theme";
import LoadingSpinner from "../common/LoadingSpinner";
import useInfiniteQuery from "@/hooks/useInfiniteQuery";
import type {
  fetchThemesProductsParams,
  FetchThemesProductsResult,
} from "@/api/themesProducts";

type ThemesProductsProps = {
  id: string | undefined;
};

const ThemesProducts = ({ id }: ThemesProductsProps) => {
  const { items, isLoading, isError, loaderRef } = useInfiniteQuery<
    FetchThemesProductsResult,
    ThemeProduct,
    fetchThemesProductsParams
  >({
    fetcher: ({ themeId, cursor, limit }) =>
      fetchThemesProducts({ themeId, cursor, limit }),
    initialParams: { themeId: Number(id), cursor: 0, limit: 20 },
    getList: res => res.list,
    getCursor: res => res.cursor,
    getHasMore: res => res.hasMoreList,
  });

  if (!items && !isLoading && isError) {
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
      {items?.length === 0 && !isLoading && (
        <BoxMessage message="상품이 없습니다." height="240px" />
      )}
      <div ref={loaderRef} style={{ height: "20px" }} />
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
