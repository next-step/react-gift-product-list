import styled from '@emotion/styled'
import { colors } from '@/theme/color'
import { typography } from '@/theme/typography'
import { spacing } from '@/theme/spacing'

export const ErrorMessage = styled.p`
  margin: 0 0 ${spacing.spacing3};
  color: ${colors.status.critical};
  font-size: ${typography.body2Regular.fontSize};
  line-height: ${typography.body2Regular.lineHeight};
`

export const YellowButton = styled.button`
  padding: ${spacing.spacing2} ${spacing.spacing4};
  background-color: ${colors.brand.kakaoYellow};
  border: none;
  border-radius: 4px;
  font-size: ${typography.body1Bold.fontSize};
  font-weight: ${typography.body1Bold.fontWeight};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover:enabled {
    background-color: ${colors.brand.kakaoYellowHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`