import styled from "@emotion/styled"

const PresentCardStyle = styled.div`
  flex: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    max-width: 3.125rem;
    max-height: 3.125rem;
    min-width: 3.125rem;
    min-height: 3.125rem;
    border-radius: 18px;
    object-fit: cover;
    overflow: hidden;
    background-color: rgb(243, 244, 245);
  }
`

export default PresentCardStyle
