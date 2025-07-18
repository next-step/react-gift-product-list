import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { Product } from '@/api/ranking';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { imageURL, name, price, brandInfo, id } = product;
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const goToCard = () => {
    if (isLoggedIn) {
      navigate(`/order/${id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <Card onClick={goToCard}>
      <ProductImage src={imageURL} alt={name} />
      <BrandName>{brandInfo.name}</BrandName>
      <Price>{price.basicPrice.toLocaleString()}원</Price>
    </Card>
  );
};

export default ProductCard;

const Card = styled.div`
  width: 215px;
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const BrandName = styled.div`
  margin-top: 8px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

const Price = styled.div`
  margin-top: 4px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textDefault};
`;
