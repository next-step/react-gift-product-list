import { Card, ProductImage, BrandName, ItemName, Price } from '@/components/GiftRanking/GiftRanking.styles';
import { Link } from 'react-router-dom';
import { PATH } from '@/constants/paths';

type ProductCardProps = {
  id: number;
  imageURL: string;
  brand: string;
  name: string;
  price: number;
};

const ThemeProductCard = ({ id, imageURL, brand, name, price }: ProductCardProps) => (
  <Link to={`${PATH.ORDER}/${id}`}>
    <Card>
      <ProductImage src={imageURL} alt={name} />
      <BrandName>{brand}</BrandName>
      <ItemName>{brand}</ItemName>
      <Price>{price.toLocaleString()} 원</Price>
    </Card>
  </Link>
);

export default ThemeProductCard;
