import * as S from './ProductInfo.styles'
import type { ProductSummary } from '@/features/Order/hooks/useProductSummary'

interface ProductInfoProps {
  product: ProductSummary
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <S.Container>
      <S.Title>상품 정보</S.Title>
      <S.ProductCard>
        <S.ProductImage src={product.imageURL} alt={product.name} />
        <S.ProductDetails>
          <S.ProductName>{product.name}</S.ProductName>
          <S.BrandName>{product.brandName}</S.BrandName>
          <S.ProductPrice>
            상품가 {product.price.toLocaleString()}원
          </S.ProductPrice>
        </S.ProductDetails>
      </S.ProductCard>
    </S.Container>
  )
}

export default ProductInfo
