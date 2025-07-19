import { useNavigate } from "react-router-dom";
import {
  BrandName,
  PriceAmount,
  ProductCardContainer,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  RankBadge,
} from "./ProductCard.styles";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/constants/routes";
import {
  PRODUCT_GRID_TYPES,
  type ProductGridType,
} from "./types/productGridTypes";

export interface ProductCardPropsType {
  id: number;
  imageURL: string;
  name: string;
  brandName: string;
  sellingPrice: number;
  index: number;
  type: ProductGridType;
}

function ProductCard({
  id,
  imageURL,
  name,
  brandName,
  sellingPrice,
  index,
  type,
}: ProductCardPropsType) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    const redirectPath = ROUTES.ORDER.replace(":id", id.toString());

    navigate(
      isLoggedIn
        ? redirectPath
        : `${ROUTES.LOGIN}?redirect=${encodeURIComponent(redirectPath)}`
    );
  };

  return (
    <ProductCardContainer onClick={handleClick}>
      {type === PRODUCT_GRID_TYPES.TRENDING_GIFTS && (
        <RankBadge isTopThree={index < 3}>{index + 1}</RankBadge>
      )}
      <ProductImage src={imageURL} alt={name} />
      <ProductInfo>
        <BrandName>{brandName}</BrandName>
        <ProductName>{name}</ProductName>
      </ProductInfo>
      <ProductPrice>
        <PriceAmount>{sellingPrice.toLocaleString()}</PriceAmount> 원
      </ProductPrice>
    </ProductCardContainer>
  );
}

export default ProductCard;
