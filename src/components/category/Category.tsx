import { fetchThemes } from '@/api/services/theme'
import type { Theme } from '@/api/types/theme'
import { Loading } from '@/components/ui'
import { useFetch } from '@/hooks/useFetch'
import { theme } from '@/styles/theme'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

// * 카테고리 컴포넌트
export const Category = () => {
  const { isLoading, isError, data: categories } = useFetch<Theme[]>(fetchThemes)

  if (isLoading)
    return (
      // 외부 컨테이너
      <Container>
        {/* 카테고리 타이틀 */}
        <h1 css={theme.typography.title.title1Bold}>선물 테마</h1>
        {/* 로딩 서브 컨테이너 */}
        <LoadingSubContainer>
          <Loading />
        </LoadingSubContainer>
      </Container>
    )
  if (isError || !categories || categories.length === 0) return null

  return (
    // 외부 컨테이너
    <Container>
      {/* 카테고리 타이틀 */}
      <h1 css={theme.typography.title.title1Bold}>선물 테마</h1>
      {/* 내부 서브 컨테이너 */}
      <SubContainer>
        {categories?.map((category) => (
          // 카테고리 아이템
          <Item to={`/category/${category.themeId}`} key={category.themeId}>
            <Image src={category.image} alt={category.name} />
            <span css={theme.typography.label.label2Regular}>{category.name}</span>
          </Item>
        ))}
      </SubContainer>
    </Container>
  )
}

// * 카테고리 컨테이너 (section 시맨틱 태그 사용)
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

// * 카테고리 서브 컨테이너
const SubContainer = styled.div`
  width: 100%;
  height: fit-content;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${theme.spacing.spacing5};
`

// * 카테고리 아이템 - 링크 연결
const Item = styled(Link)`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.spacing1};
`

// * 카테고리 이미지
const Image = styled.img`
  width: auto;
  height: 50px;

  border-radius: ${theme.spacing.spacing4};
`

// * 로딩 서브 컨테이너
const LoadingSubContainer = styled.div`
  width: 100%;
  height: 15.625rem;
`
