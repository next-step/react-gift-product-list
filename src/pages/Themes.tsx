import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { fetchThemeInfo, fetchThemeProducts } from '@/api/services/theme'
import { ROUTE_PATH } from '@/Router'
import { Loading, PageContainer } from '@/components/ui'
import type { ThemeInfo } from '@/api/types/theme'
import { HeroSection, ProductList } from '@/features/themes'
import { useFetch, usePagination } from '@/hooks'
import type { Product } from '@/api/types/product'

// * 테마 목록 상품 페이지
export const Themes = () => {
  const { id } = useParams<{ id: string }>()
  const themeId = Number(id)
  const navigate = useNavigate()

  // * Hero 정보 fetch
  const {
    data: themeInfo,
    isError: isInfoError,
    isLoading: isInfoLoading,
    errorStatus: infoErrorStatus, // ! 에러 status code (404 등 구분용)
  } = useFetch<ThemeInfo>(() => fetchThemeInfo(themeId), [themeId])

  // * 상품 리스트 페이지네이션 커스텀 훅
  const {
    list: productList,
    hasMore,
    isLoading: isProductsLoading,
    isError: isProductsError,
    fetchMore,
    resetAndFetch,
  } = usePagination<Product>({
    fetcher: useCallback((cursor, limit) => fetchThemeProducts(themeId, cursor, limit), [themeId]),
    initialCursor: 0,
    limit: 20,
    deps: [themeId],
  })

  // * themeId 변경 시 상품 리스트 초기화 및 fetch
  useEffect(() => {
    resetAndFetch()
  }, [themeId, resetAndFetch])

  // ! 404 에러 시 홈으로 이동
  useEffect(() => {
    if (isInfoError && infoErrorStatus === 404) {
      navigate(ROUTE_PATH.HOME)
    }
  }, [isInfoError, infoErrorStatus, navigate])

  // * 로딩 화면
  if (isInfoLoading) {
    return (
      <PageContainer>
        <Loading />
      </PageContainer>
    )
  }

  if (!themeInfo) return null

  return (
    <ThemesContainer>
      {/* 히어로 영역 */}
      <HeroSection themeInfo={themeInfo} />

      {/* 상품 리스트 */}
      <ProductList
        products={productList}
        isLoading={isProductsLoading}
        isError={isProductsError}
        onMore={hasMore ? () => fetchMore() : undefined}
        hasMore={hasMore}
      />
    </ThemesContainer>
  )
}

// * 테마 상품 목록 컨테이너
const ThemesContainer = styled(PageContainer)`
  justify-content: start;
  align-items: start;
`
