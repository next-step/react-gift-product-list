import theme from "@/styles/theme"
import styled from "@emotion/styled"

const PresentLayout = styled.div`
  width: 100%;
  max-width: 720px;
  flex-wrap: wrap;
  background-color: ${theme.colors.gray00};
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 4px;
  min-height: 250px;
`

export default PresentLayout
