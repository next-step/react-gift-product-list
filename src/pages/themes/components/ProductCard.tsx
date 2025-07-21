import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { id, name, imageURL, price, brandInfo } = product;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.ORDER_DETAIL_TEMPLATE.replace(":productId", String(id)));
  };

  return (
    <Card onClick={handleClick}>
      <Thumbnail src={imageURL} alt={name} />
      <BrandName>{brandInfo.name}</BrandName>
      <ProductName>{name}</ProductName>
      <Price>{price.sellingPrice.toLocaleString()}원</Price>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 8px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  margin-bottom: 8px;
`;

const BrandName = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.semantic.text.disabled};
`;

const ProductName = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-top: 2px;
`;
