import { useParams } from 'react-router-dom';
import { ThemeInfoBanner } from '@/components/ThemeInfoBanner';
import { useThemeProducts } from '@/hooks/useThemeProducts';
import { ThemeProductItem } from '@/components/ThemeProductItem'; // 변경된 부분
import { Spinner } from '@/components/common/Spinner';
import styled from '@emotion/styled';
import RootLayout from '@/layout/RootLayout';
import { Navbar } from '@/components/Navbar';

export default function ThemePage() {
  const { themeId } = useParams<{ themeId: string }>();
  const { products, isPending, error, hasMore, loadMoreRef } = useThemeProducts(
    Number(themeId),
  );

  if (error) {
    return <div>Error: {String(error)}</div>;
  }

  return (
    <RootLayout>
      <Navbar />
      <ThemeInfoBanner />
      <Container>
        <ProductGrid>
          {products.map((product) => (
            <ThemeProductItem // 변경된 부분
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                imageURL: product.imageURL,
                brandName: product.brandInfo.name, // 타입 변환
              }}
            />
          ))}
        </ProductGrid>
      </Container>

      {hasMore && (
        <div ref={loadMoreRef} style={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {isPending && <Spinner />}
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          모든 상품을 불러왔습니다.
        </div>
      )}

      {!isPending && products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          상품이 없습니다.
        </div>
      )}
    </RootLayout>
  );
}

const Container = styled.div`
    margin: 0 auto;
    padding: 16px;
`;

const ProductGrid = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 24px 8px;
`;