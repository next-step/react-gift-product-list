import styled from "@emotion/styled"
import theme from "@/styles/theme"

const PresentCardStyle = styled.button`
  flex: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background-color: ${theme.colors.gray00};
  border: none;
  img {
    width: 3.125rem;
    height: 3.125rem;

    border-radius: 18px;
    object-fit: cover;
    overflow: hidden;
  }
`

export default PresentCardStyle
