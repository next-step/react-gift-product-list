import {
  BrandName,
  Card,
  ImageWrapper,
  Price,
  ProductImage,
  ProductName,
  RankBadge,
} from '@/components/Common/CardItem/CardList.styles.ts';

interface Props {
  rank?: number;
  image: string;
  name: string;
  price: string;
  brand: string;
  onClick?: () => void;
}

export default function CardList({ rank, image, name, price, brand, onClick }: Props) {
  return (
    <Card onClick={onClick}>
      <ImageWrapper>
        {rank && <RankBadge rank={rank}>{rank}</RankBadge>}
        <ProductImage src={image} alt={name} />
      </ImageWrapper>
      <BrandName>{brand}</BrandName>
      <ProductName>{name}</ProductName>
      <Price>{price}</Price>
    </Card>
  );
}
