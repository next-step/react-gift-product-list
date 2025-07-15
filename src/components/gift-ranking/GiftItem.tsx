import styled from '@emotion/styled';

const Card = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const RankBadge = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  background: ${({ theme }) => theme.color.red.red600};
  color: ${({ theme }) => theme.color.gray.gray00};
  font-size: 14px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 50%;
`;

const Brand = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray.gray700};
`;

const ProductName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.semantic.text.default};
  text-align: center;
`;

const Price = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.semantic.text.default};
`;

interface GiftItemProps {
  id: number;
  name: string;
  imageURL: string;
  brand: string;
  price: number; 
  discountRate: number;
  rank: number;
  onClick: () => void;
}

const GiftItem = ({ name, imageURL, brand, price, rank, onClick }: GiftItemProps) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <Card>
        <ImageWrapper>
          <ProductImage src={imageURL} alt={name} />
          <RankBadge>{rank}</RankBadge>
        </ImageWrapper>
        <Brand>{brand}</Brand>
        <ProductName>{name}</ProductName>
        <Price>{price.toLocaleString()} 원</Price>
      </Card>
    </div>
  );
};

export default GiftItem;
