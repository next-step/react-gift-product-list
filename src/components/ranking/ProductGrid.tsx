import styled from '@emotion/styled';
import ProductCard from './ProductCard';
import type { Product } from '@/api/types';

interface ProductGridProps {
  products: Product[];
  showMore: boolean;
  onProductClick?: (product: Product) => void;
}

const GridContainer = styled.div<{ showMore: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-rows: ${(props) =>
    props.showMore ? 'repeat(7, 1fr)' : 'repeat(2, 1fr)'}; */
  grid-auto-rows: 1fr;
  gap: ${(props) => props.theme.spacing.spacing4};
  margin-bottom: ${(props) => props.theme.spacing.spacing4};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.spacing8} 0;
  color: ${(props) => props.theme.semanticColors.text.sub};
  font-size: ${(props) => props.theme.typography.body1Regular.fontSize};
`;

const ProductGrid = ({
  products,
  showMore,
  onProductClick,
}: ProductGridProps) => {
  if (!products || products.length === 0) {
    return <EmptyState>상품 목록이 없습니다</EmptyState>;
  }

  const displayProducts = showMore
    ? products // 전체 상품
    : products.slice(0, 6);

  return (
    <GridContainer showMore={showMore}>
      {displayProducts.map((product, index) => (
        <div
          key={product.id}
          onClick={() => onProductClick?.(product)}
          style={{ cursor: onProductClick ? 'pointer' : undefined }}
        >
          <ProductCard product={product} rank={index + 1} />
        </div>
      ))}
    </GridContainer>
  );
};

export default ProductGrid;
