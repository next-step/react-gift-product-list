import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/types/Product';

const Card = styled.li`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const ItemImage = styled.img`
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 4px;
`;

const Brand = styled.p`
  display: flex;
  align-items: center;
  margin-top: 12px;
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.colors.semantic.textSub};
`;

const Name = styled.p`
  ${({ theme }) => theme.typography.body2Regular};
`;

const Price = styled.p`
  ${({ theme }) => theme.typography.body1Bold};
  margin-top: 5px;
`;

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/order/${product.id}`);
  };

  return (
    <Card onClick={handleClick}>
      <ItemImage src={product.imageURL} alt={product.name} />
      <Brand>{product.brandInfo.name}</Brand>
      <Name>{product.name}</Name>
      <Price>{product.price.sellingPrice} 원</Price>
    </Card>
  );
}
