import styled from "@emotion/styled"
import theme from "@/styles/theme"

const PresentCardStyle = styled.div`
  flex: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  img {
    width: 3.125rem;
    height: 3.125rem;

    border-radius: 18px;
    object-fit: cover;
    overflow: hidden;
    background-color: ${theme.colors.gray200};
  }
`

export default PresentCardStyle
