import ProductCard from '@/component/ProductCard/ProductCard'
import Loading from '@/component/Loading/Loading'
import { useThemeProducts } from '../../hooks/useThemeProducts'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import * as S from './ThemeProducts.styles'
import type { Product } from '../../types/ThemeTypes'

interface ThemeProductsProps {
  themeId: number
  onProductSelect: (product: Product) => void
}

const ThemeProducts = ({ themeId, onProductSelect }: ThemeProductsProps) => {
  const {
    products,
    loading: productsLoading,
    error: productsError,
    fetchNextPage,
    hasMore,
  } = useThemeProducts(themeId)

  const observerRef = useInfiniteScroll({
    onIntersect: fetchNextPage,
    enabled: hasMore,
    threshold: 0.5,
    rootMargin: '100px',
  })

  if (productsError) return <S.ErrorText>{productsError}</S.ErrorText>
  if (productsLoading && products.length === 0) return <Loading />
  if (!productsLoading && products.length === 0)
    return <S.NoProduct>상품이 없습니다.</S.NoProduct>

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
  )
}

export default ThemeProducts
