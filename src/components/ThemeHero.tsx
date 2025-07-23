import styled from '@emotion/styled'
import { colors } from '@/theme/color'
import { typography } from '@/theme/typography'
import { spacing } from '@/theme/spacing'
import type { ThemeInfo } from '@/api/themes'

interface ThemeHeroProps {
  info: ThemeInfo
}

const Wrapper = styled.section<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  padding: ${spacing.spacing6} ${spacing.spacing4};
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing2};
  border-radius: ${spacing.spacing2};
  margin-bottom: ${spacing.spacing6};
`

const Name = styled.p`
  font-size: ${typography.body2Regular.fontSize};
  font-weight: ${typography.body2Regular.fontWeight};
  line-height: ${typography.body2Regular.lineHeight};
  color: ${colors.text.default};
`

const Divider = styled.div`
  height: 1px;
  background-color: ${colors.gray[400]};
`

const Title = styled.h5`
  margin: 0;
  font-size: ${typography.subtitle1Bold.fontSize};
  font-weight: ${typography.subtitle1Bold.fontWeight};
  line-height: ${typography.subtitle1Bold.lineHeight};
  color: ${colors.text.default};
`

const Description = styled.p`
  margin: 0;
  font-size: ${typography.body2Regular.fontSize};
  font-weight: ${typography.body2Regular.fontWeight};
  line-height: ${typography.body2Regular.lineHeight};
  color: ${colors.text.default};
`

export default function ThemeHero({ info }: ThemeHeroProps) {
  return (
    <Wrapper bgColor={info.backgroundColor}>
      <Name>{info.name}</Name>
      <Divider />
      <Title>{info.title}</Title>
      {info.description && (
        <Description>{info.description}</Description>
      )}
    </Wrapper>
  )
}