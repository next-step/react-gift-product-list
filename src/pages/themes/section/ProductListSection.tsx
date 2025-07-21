import styled from "@emotion/styled";
import { useThemeProducts } from "@/hooks/useThemeProducts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { ERROR_MESSAGES } from "@/constants/messages";
import { EmptyState } from "@/pages/themes/components/EmptyState";
import { ProductCard } from "@/pages/themes/components/ProductCard";

type Props = {
  themeId: number;
};

export const ProductListSection = ({ themeId }: Props) => {
  const { products, loading, error, hasMore, fetchNext } =
    useThemeProducts(themeId);

  const observerRef = useInfiniteScroll({
    onIntersect: fetchNext,
    enabled: hasMore && !loading,
  });

  if (error) return null;

  if (loading && products.length === 0)
    return <Placeholder>{ERROR_MESSAGES.PRODUCT.LOAD}</Placeholder>;

  if (!loading && products.length === 0) return <EmptyState />;

  return (
    <>
      <Grid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
      {hasMore && <ObserverTrigger ref={observerRef} />}

      {loading && products.length > 0 && (
        <LoadingMessage>{ERROR_MESSAGES.PRODUCT.LOAD}</LoadingMessage>
      )}
    </>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 12px;
  padding: 20px 16px;
`;

const Placeholder = styled.div`
  text-align: center;
  padding: 40px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.semantic.text.disabled};
`;

const ObserverTrigger = styled.div`
  height: 1px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.semantic.text.default};
`;
