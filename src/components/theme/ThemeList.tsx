import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { fetchThemeProducts } from '@/api/ThemeListApi';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import ThemeProductCard from './ProductCard';
import type { Product } from '@/types/Product';

const ProductGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 8px;
  padding: 16px;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 240px;
  ${({ theme }) => theme.typography.body2Regular};
`;

export default function ThemeList() {
  const { themeId } = useParams();
  const parsedId = Number(themeId);

  const { items, loading, fetchMore, isInitialLoading, hasMore } = useInfiniteScroll<Product>(
    (cursor) => fetchThemeProducts(parsedId, cursor),
  );

  const { ref } = useIntersectionObserver({
    onIntersection: fetchMore,
    disconnectCondition: !hasMore,
  });

  if (!isInitialLoading && items.length === 0) {
    return <EmptyState>상품이 없습니다.</EmptyState>;
  }

  return (
    <>
      <ProductGrid>
        {items.map((product) => (
          <ThemeProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
      <div ref={ref} style={{ height: 20 }} />
      {loading && <p>로딩 중...</p>}
    </>
  );
}
