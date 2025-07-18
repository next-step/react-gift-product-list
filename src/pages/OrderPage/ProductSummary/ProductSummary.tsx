import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as S from './ProductSummary.styles';

interface ProductSummaryData {
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

const ProductSummary = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id ?? '', 10);

  const [product, setProduct] = useState<ProductSummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNaN(productId)) {
      setError('유효하지 않은 상품 ID입니다.');
      setIsLoading(false);
      return;
    }

    const fetchProductSummary = async () => {
      try {
        setProduct(null);
        setIsLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:3000/api/products/${productId}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('존재하지 않는 상품입니다.');
          }
          throw new Error(`상품 정보를 불러오는 데 실패했습니다: ${response.statusText}`);
        }

        const result = await response.json();
        if (result && result.data) {
          setProduct(result.data);
        } else {
          setProduct(null);
          throw new Error('상품 정보를 불러올 수 없습니다.');
        }
      } catch (err) {
        setProduct(null);
        console.error('Failed to fetch product summary:', err);
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductSummary();
  }, [productId]);

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
        <S.Brand>
          <img src={product.brandInfo.imageURL} alt={product.brandInfo.name} />
          <span>{product.brandInfo.name}</span>
        </S.Brand>
        <S.Price>{product.price.sellingPrice.toLocaleString()}원</S.Price>
      </S.Info>
    </S.Wrapper>
  );
};

export default ProductSummary;
