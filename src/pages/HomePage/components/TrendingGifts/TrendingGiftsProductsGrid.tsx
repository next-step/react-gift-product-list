import styled from "@emotion/styled";
import type { TrendingGiftsType } from "@/types/TrendingGiftsType";
import {
  TRENDING_GIFTS_EMPTY_MESSAGES,
  TRENDING_GIFTS_LABELS,
} from "./constants/labels";
import ProductCard from "@/components/ProductCard/ProductCard";
import { MoreInfo, MoreInfoWrapper } from "./TrendingGifts.styles";
import { PRODUCT_GRID_TYPES } from "@/components/ProductCard/types/productGridTypes";
import EmptyProductContainer from "@/components/ProductCard/EmptyProductContainer";

const ProductGridContainer = styled.div`
  width: 95%;
  display: grid;
  grid-template-columns: ${({ theme }) => theme.layout.grid.columns.fixed3};
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

interface ProductsGridPropsType {
  products: TrendingGiftsType[];
}

function TrendingGiftsProductsGrid({ products }: ProductsGridPropsType) {
  if (products.length === 0)
    return (
      <EmptyProductContainer label={TRENDING_GIFTS_EMPTY_MESSAGES.NO_PRODUCT} />
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
            type={PRODUCT_GRID_TYPES.TRENDING_GIFTS}
          />
        ))}
      </ProductGridContainer>
      <MoreInfoWrapper>
        <MoreInfo>{TRENDING_GIFTS_LABELS.MORE_INFO}</MoreInfo>
      </MoreInfoWrapper>
    </>
  );
}

export default TrendingGiftsProductsGrid;
