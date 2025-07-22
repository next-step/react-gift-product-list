import styled from '@emotion/styled'
import { Typography } from '@/components/ui'
import type { ThemeInfo } from '@/api/types/theme'

interface HeroSectionProps {
  themeInfo: ThemeInfo
}

// * 히어로 섹션 컴포넌트
export const HeroSection = ({ themeInfo }: HeroSectionProps) => {
  return (
    <Container style={{ background: themeInfo.backgroundColor }}>
      <HeroContent>
        <Typography variant="body2Bold">{themeInfo.name}</Typography>
        <Typography variant="title1Bold">{themeInfo.title}</Typography>
        {themeInfo.description && (
          <Typography variant="body1Regular">{themeInfo.description}</Typography>
        )}
      </HeroContent>
    </Container>
  )
}

// * 컨테이너
const Container = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing6} ${({ theme }) => theme.spacing.spacing4};
  display: flex;
  align-items: center;
`

// * 히어로 텍스트 컨텐츠 컨테이너
const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing1};

  color: ${({ theme }) => theme.colors.gray.gray00};
`
