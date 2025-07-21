import styled from '@emotion/styled'
import { Typography } from '@/components/ui'
import type { ThemeInfo } from '@/api/types/theme'
import { theme } from '@/styles/theme'

interface HeroSectionProps {
  themeInfo: ThemeInfo
}

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

const Container = styled.section`
  width: 100%;
  padding: ${theme.spacing.spacing6} ${theme.spacing.spacing4};
  display: flex;
  align-items: center;
`

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing1};

  color: ${theme.colors.gray.gray00};
`
