import { Button, PageContainer, typographyMixin } from '@/components/ui'
import { ROUTE_PATH } from '@/Router'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

// * 404 NotFound 페이지
export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <PageContainer>
      <Image
        src="https://gift-s.kakaocdn.net/dn/gift/webapp/images/m640/img_not_found.png"
        alt="not found"
      />
      <Title>잘못된 접근입니다.</Title>
      <Subtitle>찾으시는 페이지가 존재하지 않습니다.</Subtitle>
      <Button variant="kakao" size="small" onClick={() => navigate(ROUTE_PATH.HOME)}>
        홈으로
      </Button>
    </PageContainer>
  )
}

export default NotFound

// * 에러 이미지
const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;

  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`

// * 타이틀
const Title = styled.h1`
  ${typographyMixin('title1Bold')}

  color: ${({ theme }) => theme.semanticColors.text.default};
`

// * 서브타이틀
const Subtitle = styled.p`
  ${typographyMixin('subtitle2Regular')}

  color: ${({ theme }) => theme.semanticColors.text.sub};
  margin: ${({ theme }) => `${theme.spacing.spacing3} 0 ${theme.spacing.spacing6}`};
`
