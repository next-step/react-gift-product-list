import { PATH } from '@/constants/paths';
import * as S from './ProductItem.styles';
import { useNavigate } from 'react-router-dom';

interface ProductItemProps {
  id: number;
  name: string;
  imageURL: string;
  sellingPrice: number;
  brandImageURL: string;
  brandName: string;
}

const ProductItem = ({
  id,
  name,
  imageURL,
  sellingPrice,
  brandImageURL,
  brandName,
}: ProductItemProps) => {
  const navigate = useNavigate();

  const goToOrderPage = () => {
    navigate(PATH.ORDER_DETAIL(id));
  };

  return (
    <S.Card onClick={goToOrderPage}>
      <S.Thumbnail src={imageURL} alt={name} />
      <S.Brand>
        <S.BrandLogo src={brandImageURL} alt={brandName} />
        <S.BrandName>{brandName}</S.BrandName>
      </S.Brand>
      <S.ProductName>{name}</S.ProductName>
      <S.Price>{sellingPrice.toLocaleString()}원</S.Price>
    </S.Card>
  );
};

export default ProductItem;
