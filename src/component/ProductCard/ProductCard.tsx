import * as S from './ProductCard.styles'
import type { Product } from '@/features/Gift/hooks/useProductsRanking'
import MyButton from '@/component/Button/Button'

interface ProductCardProps {
  products: Product[]
  visibleCount?: number
  isExpanded?: boolean
  onProductSelect: (product: Product) => void
  onToggleView?: () => void
  showToggleButton?: boolean
  showRank?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  products,
  visibleCount,
  isExpanded,
  onProductSelect,
  onToggleView,
  showToggleButton = true,
  showRank = true,
}) => {
  const list = showToggleButton
    ? products.slice(0, visibleCount ?? products.length)
    : products

  return (
    <>
      <S.ProductTab>
        {list.map((item, index) => (
          <S.ProductItem key={item.id} onClick={() => onProductSelect(item)}>
            {showRank && <S.Rank rank={index + 1}>{index + 1}</S.Rank>}
            <S.ProductImage src={item.imageURL} alt={item.name} />
            <S.BrandName>{item.brandInfo.name}</S.BrandName>
            <S.ProductName>{item.name}</S.ProductName>
            <strong>{item.price.sellingPrice.toLocaleString()} 원</strong>
          </S.ProductItem>
        ))}
      </S.ProductTab>

      {showToggleButton && onToggleView && (
        <MyButton
          onClick={onToggleView}
          variant="outlined"
          size="medium"
          fullWidth
        >
          {isExpanded ? '접기' : '더보기'}
        </MyButton>
      )}
    </>
  )
}

export default ProductCard
