import { useNavigate } from 'react-router-dom';
import type { ThemeProduct } from './ProductList';
import styled from '@emotion/styled';

const ProductCard = (productInfo: ThemeProduct) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/order/${productInfo.id}`)}>
      <ProductImage src={productInfo.imageURL} alt="사진" />
      <Brand>{productInfo.brandInfo.name}</Brand>
      <ProductName>{productInfo.name}</ProductName>
      <Price>{productInfo.price.basicPrice.toLocaleString()} 원</Price>
    </Card>
  );
};

export default ProductCard;

const Card = styled.div`
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Brand = styled.p(({ theme }) => ({
  marginTop: theme.spacing.spacing2,
  fontSize: theme.typography.label2Regular.fontSize,
  color: theme.colors.gray.gray600,
}));

const ProductName = styled.p(({ theme }) => ({
  fontWeight: theme.typography.body2Bold.fontWeight,
  fontSize: theme.typography.body2Bold.fontSize,
  margin: 0,
}));

const Price = styled.p(({ theme }) => ({
  marginTop: '4px',
  fontWeight: theme.typography.body2Bold.fontWeight,
  fontSize: theme.typography.body2Bold.fontSize,
}));
