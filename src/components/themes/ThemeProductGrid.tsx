import { LoadingSpinner } from "@/components/common";
import { useRouter } from "@/hooks/common/useRouter";
import { useGetThemeProducts } from "@/hooks/themes/useGetThemeProducts";
import styled from "@emotion/styled";

const ThemeProductGridContainer = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: theme.spacing2,
  padding: theme.spacing4,
}));

const ThemeProductGridItem = styled.div(({ theme }) => ({
  backgroundColor: `${theme.color.gray[0]}`,
  borderRadius: `${theme.spacing3}`,
  cursor: "pointer",
  position: "relative",
}));

const ThemeProductImageContainer = styled.img(({ theme }) => ({
  width: "100%",
  aspectRatio: "1 / 1",
  objectFit: "cover",
  borderRadius: "4px",
  marginBottom: `${theme.spacing3}`,
}));

const ThemeProductCategoryText = styled.p(({ theme }) => ({
  fontSize: `${theme.typography.label1Regular.fontSize}`,
  fontWeight: `${theme.typography.label1Regular.fontWeight}`,
  lineHeight: `${theme.typography.label1Regular.lineHeight}`,
  color: `${theme.color.gray[500]}`,
}));

const ThemeProductProductTitle = styled.p(({ theme }) => ({
  fontSize: `${theme.typography.label1Regular.fontSize}`,
  fontWeight: `${theme.typography.label1Regular.fontWeight}`,
  color: `${theme.color.gray[900]}`,
  marginBottom: `${theme.spacing2}`,
}));

const ThemeProductPriceText = styled.p(({ theme }) => ({
  fontSize: `${theme.typography.title2Bold.fontSize}`,
  fontWeight: `${theme.typography.title2Bold.fontWeight}`,
  color: `${theme.color.gray[900]}`,
}));

const LoadingTrigger = styled.div({
  gridColumn: "1 / -1",
  display: "flex",
  justifyContent: "center",
  padding: "20px",
});

const EmptyContainer = styled.div(({ theme }) => ({
  gridColumn: "1 / -1",
  height: "50vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: `${theme.spacing8} 0`,
  color: `${theme.color.gray[900]}`,
  fontSize: `${theme.typography.body1Regular.fontSize}`,
}));

interface ThemeProductGridProps {
  themeId: number;
}

export const ThemeProductGrid = ({ themeId }: ThemeProductGridProps) => {
  const { products, loading, hasMore, ref } = useGetThemeProducts(themeId);
  const { goOrderPage } = useRouter();

  if (loading && products.length === 0) {
    return <LoadingSpinner />;
  }
  if (!loading && products.length === 0) {
    return <EmptyContainer>상품이 없습니다.</EmptyContainer>;
  }

  return (
    <ThemeProductGridContainer>
      {products.map(product => (
        <ThemeProductGridItem
          key={product.id}
          onClick={() => goOrderPage(product.id)}
        >
          <ThemeProductImageContainer
            src={product.imageURL}
            alt={product.name}
          />
          <ThemeProductCategoryText>
            {product.brandInfo.name}
          </ThemeProductCategoryText>
          <ThemeProductProductTitle>{product.name}</ThemeProductProductTitle>
          <ThemeProductPriceText>
            {product.price?.basicPrice}원
          </ThemeProductPriceText>
        </ThemeProductGridItem>
      ))}
      {loading && products.length > 0 && (
        <LoadingTrigger>
          <LoadingSpinner />
        </LoadingTrigger>
      )}
      {hasMore && !loading && <LoadingTrigger ref={ref} />}
    </ThemeProductGridContainer>
  );
};
