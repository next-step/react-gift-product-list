import styled from "@emotion/styled";
import { fetchProductSummary } from "@src/apis/BackEnd/apiList";
import useFetchState from "@src/hooks/useFetchState";
import theme from "@src/styles/kakaoTheme";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

function ProductCard() {
  const productId = useParams().id ?? "";
  const update = useCallback(() => fetchProductSummary(productId), [productId]);
  const productData = useFetchState(update);

  return (
    <ProductCardWrapper>
      <Image src={productData?.data?.imageURL} alt="image" />
      <Description>
        <ProductName>{productData?.data?.name}</ProductName>
        <BrandName>{productData?.data?.brandName}</BrandName>
        <Price>
          상품가 <strong>{productData?.data?.price}원</strong>
        </Price>
      </Description>
    </ProductCardWrapper>
  );
}

const ProductName = styled.p`
  margin: 0;
`;

const BrandName = styled.p`
  margin: 0;
  font-size: 12.5px;
  color: ${theme.colors.gray.gray700};
  margin-bottom: 10px;
`;

const Price = styled.p`
  margin: 0;
`;

const Image = styled.img`
  height: 100%;
  border-radius: 5px;
`;

const Description = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-around;
  margin-left: 10px;
`;

const ProductCardWrapper = styled.div`
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid ${theme.colors.gray.gray500};
  border-radius: 10px;
  margin: 4px;
  padding: 10px;
`;

export default ProductCard;
