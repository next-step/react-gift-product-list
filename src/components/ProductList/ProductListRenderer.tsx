import * as S from './ProductListRenderer.styles';
import ProductItem from '@/components/ProductList/ProductItem';

interface Product {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

interface ProductListRendererProps {
  isLoading: boolean;
  error: string | null;
  products: Product[] | null | undefined;
}

const ProductListRenderer = ({ isLoading, error, products }: ProductListRendererProps) => {
  if (isLoading) {
    return <S.LoadingMessage>상품 목록을 불러오는 중...</S.LoadingMessage>;
  }

  if (error) {
    return <S.ErrorMessage>{error}</S.ErrorMessage>;
  }

  if (!products || products.length === 0) {
    return <S.NoProductMessage>보여줄 상품 목록이 없습니다.</S.NoProductMessage>;
  }

  return (
    <S.Grid>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          name={product.name}
          imageURL={product.imageURL}
          sellingPrice={product.price.sellingPrice}
          brandImageURL={product.brandInfo.imageURL}
          brandName={product.brandInfo.name}
        />
      ))}
    </S.Grid>
  );
};

export default ProductListRenderer;
