import styled from '@emotion/styled';
import type { Product } from '@/api/types';

interface ProductCardProps {
  product: Product;
  rank: number;
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.spacing2};
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: ${(props) => props.theme.semanticColors.background.fill};
`;

const RankBadge = styled.div<{ isTopThree: boolean }>`
  position: absolute;
  top: ${(props) => props.theme.spacing.spacing1};
  left: ${(props) => props.theme.spacing.spacing1};
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.isTopThree ? props.theme.colors.red500 : props.theme.colors.gray500};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  font-family: 'Pretendard', sans-serif;
`;

const BrandName = styled.div`
  font-size: ${(props) => props.theme.typography.body2Regular.fontSize};
  font-weight: ${(props) => props.theme.typography.body2Regular.fontWeight};
  color: ${(props) => props.theme.semanticColors.text.sub};
  font-family: 'Pretendard', sans-serif;
`;

const ProductName = styled.div`
  font-size: ${(props) => props.theme.typography.body2Regular.fontSize};
  font-weight: ${(props) => props.theme.typography.body2Regular.fontWeight};
  color: ${(props) => props.theme.semanticColors.text.default};
  font-family: 'Pretendard', sans-serif;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Price = styled.div`
  font-size: ${(props) => props.theme.typography.body1Bold.fontSize};
  font-weight: ${(props) => props.theme.typography.body1Bold.fontWeight};
  color: ${(props) => props.theme.semanticColors.text.default};
  font-family: 'Pretendard', sans-serif;
`;

const ProductCard = ({ product, rank }: ProductCardProps) => {
  const isTopThree = rank <= 3;

  return (
    <CardContainer>
      <ImageContainer>
        <RankBadge isTopThree={isTopThree}>{rank}</RankBadge>
        <ProductImage
          src={product.imageURL}
          alt={product.name}
          loading="lazy"
        />
      </ImageContainer>
      <BrandName>{product.brandInfo.name}</BrandName>
      <ProductName>{product.name}</ProductName>
      <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
    </CardContainer>
  );
};

export default ProductCard;
