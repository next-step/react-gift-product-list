import { useNavigate } from 'react-router-dom';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { RankingItemCard, Loading } from '@/components';
import type { RankingProduct } from '@/types/api';
import * as S from './styles';

interface ThemeProductSectionProps {
  themeId: number;
}

const ThemeProductSection = ({ themeId }: ThemeProductSectionProps) => {
  const navigate = useNavigate();
  const { products, isLoading, hasMore, loadingRef } = useInfiniteScroll({ themeId });

  const handleProductClick = (product: RankingProduct) => {
    navigate(`/order/${product.id}`);
  };

  if (isLoading && products.length === 0) {
    return (
      <S.Section>
        <Loading height="400px" />
      </S.Section>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <S.Section>
        <S.EmptyMessage>해당 테마의 상품이 없습니다.</S.EmptyMessage>
      </S.Section>
    );
  }

  return (
    <S.Section>
      <S.Grid>
        {products.map((product) => (
          <RankingItemCard
            key={product.id}
            imageUrl={product.imageURL}
            title={product.name}
            subtitle={product.brandInfo.name}
            price={product.price.sellingPrice}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </S.Grid>

      <div ref={loadingRef} style={{ height: '20px' }}>
        {hasMore && isLoading && (
          <S.LoadingMore>
            <Loading height="60px" message="상품을 불러오는 중..." />
          </S.LoadingMore>
        )}
      </div>
    </S.Section>
  );
};

export default ThemeProductSection; 