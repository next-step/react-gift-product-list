import styled from '@emotion/styled'
import { Typography, Loading } from '@/components/ui'
import type { Product } from '@/api/types/product'
import { theme } from '@/styles/theme'
import { ProductItem } from '@/features/product'
import { useRef } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

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
  // * 기준이 될 div의 ref 생성 (무한스크롤)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  // * 옵저버 활성화 조건
  const canObserve = !!hasMore && !isLoading && !isError

  // * 무한스크롤 옵저버 훅
  useIntersectionObserver(
    loaderRef,
    () => {
      if (onMore) onMore()
    },
    canObserve,
  )

  // * 조건부 렌더링을 body 변수로 분리
  let body: React.ReactNode

  if (isLoading && products.length === 0) {
    // * 첫 로딩
    body = (
      <SubContainer>
        <Loading />
      </SubContainer>
    )
  } else if (isError || products.length === 0) {
    // * 에러 또는 빈 목록
    body = (
      <SubContainer>
        <Typography variant="subtitle2Regular">상품이 없습니다.</Typography>
      </SubContainer>
    )
  } else {
    // * 정상적으로 불러온 경우(추가 로딩 포함)
    body = (
      <>
        <ProductContainer>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
          {canObserve && <div ref={loaderRef} style={{ height: 0 }} />}
        </ProductContainer>
        {/* 추가 로딩 중일 때 하단에 로딩 표시 */}
        {isLoading && products.length > 0 && (
          <SubContainer>
            <Loading />
          </SubContainer>
        )}
      </>
    )
  }

  return <ProductListSection>{body}</ProductListSection>
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
