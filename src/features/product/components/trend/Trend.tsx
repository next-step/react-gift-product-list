import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TrendFilter } from './TrendFilter'
import { ProductItem } from './ProductItem'
import { Button, Loading, Typography } from '@/components/ui'
import { theme } from '@/styles/theme'
import { useFetch } from '@/hooks/useFetch'
import { fetchProductRankList } from '@/api/services/product'
import {
  isValidRankType,
  isValidTargetType,
  RankType,
  TargetType,
  type Product,
} from '@/api/types/product'

// * 실시간 급상승 컴포넌트
export const Trend = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showAll, setShowAll] = useState(false)

  // * URL 파라미터에서 초기값 가져오기
  const getInitialTargetType = (): TargetType => {
    const urlTargetType = searchParams.get('targetType')
    return urlTargetType && isValidTargetType(urlTargetType) ? urlTargetType : TargetType.ALL
  }

  const getInitialRankType = (): RankType => {
    const urlRankType = searchParams.get('rankType')
    return urlRankType && isValidRankType(urlRankType) ? urlRankType : RankType.MANY_WISH
  }

  // * URL 파라미터 타입별 상태 관리
  const [targetType, setTargetType] = useState<TargetType>(getInitialTargetType)
  const [rankType, setRankType] = useState<RankType>(getInitialRankType)

  // * 상품 랭킹 데이터 fetch
  const {
    isLoading,
    isError,
    data: products,
  } = useFetch<Product[]>(() => fetchProductRankList(targetType, rankType))

  // * 초기 보여줄 상품 개수
  const INITIAL_SHOW_COUNT = 6

  // * 표시할 상품 리스트 결정
  const displayProducts = showAll ? (products ?? []) : (products ?? []).slice(0, INITIAL_SHOW_COUNT)

  // * 더보기 버튼 표시 여부
  const shouldShowMoreButton = (products?.length ?? 0) > INITIAL_SHOW_COUNT

  // * URL 파라미터 변경 감지
  // ! 불필요한 리렌더링 방지를 위해 상태 변화 감지는 searchParams 만 적용
  useEffect(() => {
    const urlTargetType = searchParams.get('targetType')
    const urlRankType = searchParams.get('rankType')

    if (urlTargetType && isValidTargetType(urlTargetType)) {
      setTargetType(urlTargetType)
    }

    if (urlRankType && isValidRankType(urlRankType)) {
      setRankType(urlRankType)
    }
  }, [searchParams])

  // * 더보기 버튼 핸들러
  const handleMoreButtonClick = () => {
    setShowAll(!showAll)
  }

  // * Target 타입 필터 핸들러
  const handleTargetTypeChange = (type: TargetType) => {
    setTargetType(type)

    // * URL 파라미터 업데이트
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('targetType', type)
    setSearchParams(newSearchParams)
  }

  // * Rank 타입 필터 핸들러
  const handleRankTypeChange = (type: RankType) => {
    setRankType(type)

    // * URL 파라미터 업데이트
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('rankType', type)
    setSearchParams(newSearchParams)
  }

  // * 로딩 화면
  if (isLoading)
    return (
      <Container>
        {/* 실시간 급상승 필터 컨테이너 */}
        <h1 css={theme.typography.title.title1Bold}>실시간 급상승 선물랭킹</h1>

        {/* 필터 */}
        <TrendFilter
          targetType={targetType}
          rankType={rankType}
          onTargetTypeChange={handleTargetTypeChange}
          onRankTypeChange={handleRankTypeChange}
        />

        {/* 로딩 컨테이너 */}
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      </Container>
    )

  // * 빈 목록 or 에러 화면
  if (isError || !products || products.length === 0)
    return (
      <Container>
        {/* 실시간 급상승 필터 컨테이너 */}
        <h1 css={theme.typography.title.title1Bold}>실시간 급상승 선물랭킹</h1>

        {/* 필터 */}
        <TrendFilter
          targetType={targetType}
          rankType={rankType}
          onTargetTypeChange={handleTargetTypeChange}
          onRankTypeChange={handleRankTypeChange}
        />

        {/* 로딩 컨테이너 */}
        <LoadingContainer>
          <EmptyMsg variant="subtitle2Regular">상품 목록이 없습니다.</EmptyMsg>
        </LoadingContainer>
      </Container>
    )

  return (
    <Container>
      {/* 실시간 급상승 필터 컨테이너 */}
      <h1 css={theme.typography.title.title1Bold}>실시간 급상승 선물랭킹</h1>

      {/* 필터 */}
      <TrendFilter
        targetType={targetType}
        rankType={rankType}
        onTargetTypeChange={handleTargetTypeChange}
        onRankTypeChange={handleRankTypeChange}
      />

      {/* 실시간 급상승 상품 컨테이너 */}
      <ProductContainer>
        {displayProducts.map((product, index) => (
          <ProductItem key={product.id} product={product} index={index} />
        ))}
      </ProductContainer>

      {/* 더보기 버튼 */}
      {shouldShowMoreButton && (
        <MoreButtonContainer>
          <Button variant="outline" size="medium" onClick={handleMoreButtonClick}>
            {showAll ? '접기' : `더보기`}
          </Button>
        </MoreButtonContainer>
      )}
    </Container>
  )
}

// * 실시간 급상승 컨테이너 (section 시맨틱 태그 사용)
const Container = styled.section`
  width: 100%;
  height: fit-content;

  padding: ${theme.spacing.spacing5};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: ${theme.spacing.spacing5};
`

// * 실시간 급상승 상품 컨테이너
const ProductContainer = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 18.875rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: ${theme.spacing.spacing2};
  row-gap: ${theme.spacing.spacing5};
`

// * 더보기 버튼 컨테이너
const MoreButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${theme.spacing.spacing4};
`

// * 로딩 컨테이너
const LoadingContainer = styled.div`
  width: 100%;
  height: 18.875rem;

  display: flex;
  justify-content: center;
  align-items: center;
`

// * 빈 목록 메시지
const EmptyMsg = styled(Typography)`
  color: ${theme.semanticColors.text.sub};
`
