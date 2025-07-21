import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { fetchThemeInfo } from '@/api/services/theme'
import { ROUTE_PATH } from '@/Router'
import { Loading, PageContainer } from '@/components/ui'
import type { ThemeInfo } from '@/api/types/theme'
import { HeroSection } from '@/features/themes'
import { useFetch } from '@/hooks'

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
    </ThemesContainer>
  )
}

// * 테마 상품 목록 컨테이너
const ThemesContainer = styled(PageContainer)`
  justify-content: start;
  align-items: start;
`
