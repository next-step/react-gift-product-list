import type { Product } from '@/features/Gift/hooks/useProductsRanking';
import ProductCard from '@/components/ProductCard/ProductCard';
import Loading from '@/components/Loading/Loading';
import { useThemeProducts } from '../hooks/useThemeProducts';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import * as S from './ThemeProducts.styles';

interface ThemeProductsProps {
  themeId: number;
  onProductSelect: (product: Product) => void;
}

const ThemeProducts = ({ themeId, onProductSelect }: ThemeProductsProps) => {
  const {
    products,
    loading: productsLoading,
    error: productsError,
    fetchNextPage,
    hasMore,
  } = useThemeProducts(themeId);

  const observerRef = useInfiniteScroll({
    onIntersect: fetchNextPage,
    enabled: hasMore,
  });

  if (productsError) return <S.ErrorText>{productsError}</S.ErrorText>;
  if (productsLoading && products.length === 0) return <Loading />;
  if (!productsLoading && products.length === 0)
    return <S.NoProduct>상품이 없습니다.</S.NoProduct>;

  return (
    <S.Container>
      <ProductCard
        products={products}
        onProductSelect={onProductSelect}
        showToggleButton={false}
        showRank={false}
      />
      {hasMore && <div ref={observerRef} />}
    </S.Container>
  );
};

export default ThemeProducts;
