import styled from '@emotion/styled'
import { theme } from '@/theme'

interface ContainerProps {
  backgroundColor: string
}

export const Container = styled.div<ContainerProps>`
  padding: ${theme.spacing[7]};
  color: ${theme.colors.colorScale.gray[0]};
  background-color: ${({ backgroundColor }) => backgroundColor};
`

export const ThemeName = styled.div`
  ${theme.typography.subtitle1Bold};
  margin-bottom: ${theme.spacing[2]};
`

export const ThemeTitle = styled.div`
  ${theme.typography.title1Bold};
  margin-bottom: ${theme.spacing[2]};
`

export const ThemeDescription = styled.div`
  ${theme.typography.subtitle1Regular};
`
