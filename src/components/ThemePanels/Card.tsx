import styled from "@emotion/styled";
import { PATH } from "@src/router/Router";
import theme from "@src/styles/kakaoTheme";
import { useNavigate } from "react-router-dom";
import type { ThemeProductData } from "./ThemePanel";

function Card({ product }: { product: ThemeProductData }) {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`${PATH.ORDER}/${product.id}`);
  };

  return (
    <CardWrapper onClick={clickHandler}>
      <CardImage src={product.imageURL} alt="image" />
      <GrayP>{product.brandInfo.name}</GrayP>
      <ZeroMarginP>{product.name}</ZeroMarginP>
      <ZeroMarginP>
        <BoldSpan>{product.price.sellingPrice}</BoldSpan> 원
      </ZeroMarginP>
    </CardWrapper>
  );
}

const ZeroMarginP = styled.p`
  text-align: left;
  width: 100%;
  margin: 0;
`;

const GrayP = styled.p`
  text-align: left;
  width: 100%;
  color: ${theme.colors.gray.gray600};
  margin: 0;
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const CardWrapper = styled.button`
  position: relative;
  flex: 1 30%;
  border: none;
  padding: 0;
  background-color: transparent;
`;

const CardImage = styled.img`
  width: 100%;
  border-radius: 2.5%;
`;

export default Card;
