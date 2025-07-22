import type { ThemeProduct } from "@/types/theme";
import styled from "@emotion/styled";

type ThemesItemProps = {
  product: ThemeProduct;
};

const ThemesItem = ({ product }: ThemesItemProps) => {
  return (
    <Container>
      <div>
        <Img src={product.imageURL} alt={product.name} />
        <BrandName>{product.brandInfo.name}</BrandName>
        <ProductName>{product.name}</ProductName>
      </div>
      <Price>
        {product.price.sellingPrice} <Span>원</Span>
      </Price>
    </Container>
  );
};

export default ThemesItem;

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center center;
  border-radius: 4px;
  margin: 0;
`;

const BrandName = styled.p`
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.sub};
`;

const ProductName = styled.h6`
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  margin-bottom: ${({ theme }) => theme.spacing.spacing1};
`;

const Price = styled.p`
  font-size: ${({ theme }) => theme.typography.title2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title2Bold.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
`;

const Span = styled.span`
  font-weight: ${({ theme }) => theme.typography.title2Regular.fontWeight};
`;
