import styled from "@emotion/styled";

export const ProductDiv = styled.div`
  width: 100%;
`;

export const ProductGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 8px;
`;

export const ProductCard = styled.div`
  text-align: center;
  overflow: hidden;
  border-radius: 8px;
`;

export const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
`;

export const BrandImage = styled.img`
  width: 32px;
  height: 32px;
  margin: 4px auto;
`;

export const Price = styled.p`
  font-weight: bold;
`;
export const ProductInfo = styled.p`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 6px 0 0;
`;
