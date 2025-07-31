import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { Product } from '@/api/ranking';
import ProductCard from '@/common/ProductCard';

interface ProductCardContainerProps {
  product: Product;
}

const ProductCardContainer = ({ product }: ProductCardContainerProps) => {
  const { imageURL, price, brandInfo, id } = product;
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const goToCard = () => {
    if (isLoggedIn) {
      navigate(`/order/${id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <ProductCard
      onClick={goToCard}
      src={imageURL}
      brandName={brandInfo.name}
      price={price.basicPrice.toLocaleString()}
    />
  );
};

export default ProductCardContainer;
