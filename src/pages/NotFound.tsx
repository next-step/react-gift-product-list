import styled from '@emotion/styled'
import { colors } from '@/theme/color'
import { typography } from '@/theme/typography'
import { spacing } from '@/theme/spacing'
import { useNavigate } from 'react-router-dom'
import { YellowButton } from '@/components/common'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: ${colors.text.default};
`

const Message = styled.h1`
  font-size: ${typography.title2Bold.fontSize};
  font-weight: ${typography.title2Bold.fontWeight};
  line-height: ${typography.title2Bold.lineHeight};
`

const HomeButton = styled(YellowButton)`
  margin-top: ${spacing.spacing6};
`

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Container>
      <Message>페이지를 찾을 수 없습니다.</Message>
      <HomeButton onClick={() => navigate('/')}>홈으로 이동</HomeButton>
    </Container>
  )
}