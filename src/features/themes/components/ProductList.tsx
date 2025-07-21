import styled from '@emotion/styled'
import { Typography, Loading } from '@/components/ui'
import type { Product } from '@/api/types/product'
import { theme } from '@/styles/theme'
import { ProductItem } from '@/features/product'

interface ProductListProps {
  products: Product[]
  isLoading: boolean
  isError: boolean
  onMore?: () => void
  hasMore?: boolean
}

// * 상품 리스트 섹션
export const ProductList = ({
  products,
  isLoading,
  isError,
  onMore,
  hasMore,
}: ProductListProps) => {
  return (
    <ProductListSection>
      {isError || products.length === 0 ? (
        // ! 상품 리스트가 없을 때
        <SubContainer>
          <Typography variant="subtitle2Regular">상품이 없습니다.</Typography>
        </SubContainer>
      ) : isLoading ? (
        // * 로딩 중일 때
        <SubContainer>
          <Loading />
        </SubContainer>
      ) : (
        // * 정상적으로 불러왔을 때
        <ProductContainer>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </ProductContainer>
      )}
    </ProductListSection>
  )
}

// * 상품 리스트 섹션
const ProductListSection = styled.section`
  width: 100%;
  min-height: 15rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.spacing3};
`

// * 상품 리스트 컨테이너
const ProductContainer = styled.div`
  width: 100%;
  height: fit-content;

  padding: ${theme.spacing.spacing4};

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: ${theme.spacing.spacing2};
  row-gap: ${theme.spacing.spacing5};
`

// * 서브 컨테이너 (로딩 or 에러 or 빈 페이지)
const SubContainer = styled.div`
  flex: 1;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`
