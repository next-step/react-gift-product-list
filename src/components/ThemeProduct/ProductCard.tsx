import type { ProductItem } from '@/Api/api';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
`;

const ProductImage = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
  aspect-ratio: 1/1;
  overflow: hidden;
  background-color: rgb(243, 244, 245);
`;

const Margin = styled.div<{ height: string }>(({ height }) => ({
  width: '100%',
  height: height,
  backgroundColor: 'transparent',
}));

const Subtitle = styled.p(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: '1.1875rem',
  color: theme.semanticColors.text.sub,
  margin: '0px',
  textAlign: 'left',
}));

const Title = styled.h6(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: '1.1875rem',
  color: theme.semanticColors.text.default,
  margin: '0px',
  textAlign: 'left',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}));

const Price = styled.p(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 700,
  lineHeight: '1.5rem',
  color: theme.semanticColors.text.default,
  margin: '0px',
  textAlign: 'left',
  wordBreak: 'break-word',
}));

interface Props {
  product: ProductItem;
  onClick?: () => void;
}

const ProductCard = ({ product, onClick }: Props) => {
  const { name, imageURL, price, brandInfo } = product;
  const formatted = price.sellingPrice.toLocaleString();

  return (
    <Container onClick={onClick}>
      <ProductImage src={imageURL} alt={name} />
      <Margin height="12px" />
      <Subtitle>{brandInfo.name}</Subtitle>
      <Title>{name}</Title>
      <Margin height="4px" />
      <Price>
        {formatted}
        <span style={{ fontWeight: '400' }}>원</span>
      </Price>
    </Container>
  );
};

export default ProductCard;
