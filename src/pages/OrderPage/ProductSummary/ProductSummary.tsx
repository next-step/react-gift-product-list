import { useParams } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import * as S from './ProductSummary.styles';

interface ProductSummaryData {
  id: number;
  name: string;
  price: number;
  imageURL: string;
  brandName?: string;
}

const ProductSummary = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id ?? '', 10);

  const url = isNaN(productId) ? null : `http://localhost:3000/api/products/${productId}/summary`;

  const { data: product, isLoading, error } = useFetch<ProductSummaryData>(url);

  if (isNaN(productId)) {
    return (
      <S.Wrapper style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        <p>유효하지 않은 상품 ID입니다.</p>
      </S.Wrapper>
    );
  }

  if (isLoading) {
    return (
      <S.Wrapper style={{ textAlign: 'center', padding: '20px' }}>
        <p>상품 정보를 불러오는 중...</p>
      </S.Wrapper>
    );
  }

  if (error) {
    return (
      <S.Wrapper style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        <p>{error}</p>
      </S.Wrapper>
    );
  }

  if (!product) {
    return (
      <S.Wrapper style={{ textAlign: 'center', padding: '20px' }}>
        <p>상품 정보를 찾을 수 없습니다.</p>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Thumbnail src={product.imageURL} alt={product.name} />
      <S.Info>
        <S.Name>{product.name}</S.Name>
        {product.brandName && (
          <S.Brand>
            <span>{product.brandName}</span>
          </S.Brand>
        )}
        <S.Price>{product.price.toLocaleString()}원</S.Price>
      </S.Info>
    </S.Wrapper>
  );
};

export default ProductSummary;
