import styled from '@emotion/styled';
import type { ThemeProduct } from '@/types/themeProduct';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const Brand = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.color.semantic.text.sub};
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 14px;
`;

interface Props {
  product: ThemeProduct;
}

const ThemeProductCard = ({ product }: Props) => {
  return (
    <Card>
      <Image src={product.imageURL} alt={product.name} />
      <Brand>{product.brandInfo.name}</Brand>
      <Name>{product.name}</Name>
      <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
    </Card>
  );
};

export default ThemeProductCard;
