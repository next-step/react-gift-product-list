import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import type { Product } from '@/types/product';

interface Props {
  product: Product;
}

export function ThemeProductItem({ product }: Props) {
  return (
    <Card>
      <Link to={`/order/${product.id}`}>
        <ThumbWrapper>
          <Thumb src={product.imageURL} alt={product.name} loading="lazy" />
        </ThumbWrapper>

        <InfoContainer>
          <Brand>{product.brandName}</Brand>
          <Name title={product.name}>{product.name}</Name>
          <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
        </InfoContainer>
      </Link>
    </Card>
  );
}

/* ───────── styles ───────── */

const Card = styled.li`
  width: calc((100% - 16px) / 3);
  position: relative;
`;

const ThumbWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const Thumb = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  padding: 8px 0;
`;

const Brand = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #8D8D8D;
`;

const Name = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Price = styled.h3`
  margin-top: 4px;
  font-size: 16px;
  font-weight: 700;
`;
