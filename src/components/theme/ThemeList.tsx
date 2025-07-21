import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { fetchThemeProducts } from '@/api/ThemeListApi';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import ThemeProductCard from './ProductCard';
import type { Product } from '@/types/Product';

const ProductGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 8px;
  padding: 16px;
`;

export default function ThemeList() {
  const { themeId } = useParams();
  const parsedId = Number(themeId);

  const { items, loading, loaderRef } = useInfiniteScroll<Product>((cursor) =>
    fetchThemeProducts(parsedId, cursor),
  );

  return (
    <>
      <ProductGrid>
        {items.map((product) => (
          <ThemeProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
      <div ref={loaderRef} style={{ height: 20 }} />
      {loading && <p>로딩 중...</p>}
    </>
  );
}
