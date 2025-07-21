import styled from "@emotion/styled"
import theme from "@/styles/theme"
interface CardStyle {
  borderRadius: keyof typeof theme.space
}

const Card = styled.div<CardStyle>`
  background: ${theme.colors.gray00};
  border-radius: ${({ theme, borderRadius }) => theme.space[borderRadius]};
  padding: 0 0 16px 0;
  position: relative;
`

export default Card
