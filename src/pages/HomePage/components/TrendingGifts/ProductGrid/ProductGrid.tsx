import styled from "@emotion/styled";
import type { TrendingGiftsType } from "@/types/TrendingGiftsType";
import ProductCard from "../ProductCard/ProductCard";
import { MoreInfo, MoreInfoWrapper } from "../TrendingGifts.styles";
import {
  TRENDING_GIFTS_EMPTY_MESSAGES,
  TRENDING_GIFTS_LABELS,
} from "../constants/labels";

const ProductGridContainer = styled.div`
  width: 95%;
  display: grid;
  grid-template-columns: ${({ theme }) => theme.layout.grid.columns.fixed3};
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

const EmptyProductContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 125px;
  margin-bottom: 125px;
`;

const EmptyProductText = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label1Regular.fontWeight};
`;

interface ProductGridPropsType {
  products: TrendingGiftsType[];
}

function ProductGrid({ products }: ProductGridPropsType) {
  if (products.length === 0)
    return (
      <EmptyProductContainer>
        <EmptyProductText>
          {TRENDING_GIFTS_EMPTY_MESSAGES.NO_PRODUCT}
        </EmptyProductText>
      </EmptyProductContainer>
    );

  return (
    <>
      <ProductGridContainer>
        {products.map((product, idx) => (
          <ProductCard
            key={product.id}
            id={product.id}
            imageURL={product.imageURL}
            name={product.name}
            brandName={product.brandInfo.name}
            sellingPrice={product.price.sellingPrice}
            index={idx}
          />
        ))}
      </ProductGridContainer>
      <MoreInfoWrapper>
        <MoreInfo>{TRENDING_GIFTS_LABELS.MORE_INFO}</MoreInfo>
      </MoreInfoWrapper>
    </>
  );
}

export default ProductGrid;
