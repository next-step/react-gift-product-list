import styled from "@emotion/styled"
import Text from "../Text"

const NotFoundDiv = styled.div`
  display: flex;             
  justify-content: center;   
  align-items: center;  
width:100%;
  height: 25vh; 
`
const ThemeNotFound = () => {
  return (<NotFoundDiv ><Text variant="subtitle2Regular" margin="spacing0" padding="spacing0">상품이 없습니다.</Text> </NotFoundDiv>)
}
export default ThemeNotFound
