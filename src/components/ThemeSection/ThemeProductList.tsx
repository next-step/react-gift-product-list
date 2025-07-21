import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '@/components/RankingSection/ProductCard';
import CardGrid from '@/components/common/CardGrid';
import styled from '@emotion/styled';
import { getThemeProductsUrl } from '@/constants/api';

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

const ThemeProductList = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!themeId) return;

    const fetchProducts = async () => {
      try {
        const res = await axios.get<{ data: { list: Product[] } }>(
          getThemeProductsUrl(themeId)
        );
        setProducts(res.data.data.list);
      } catch {
        setError(true);
      }
    };

    fetchProducts();
  }, [themeId]);

  if (error) return <ErrorText>상품 정보를 불러오지 못했어요.</ErrorText>;
  if (products === null)
    return <LoadingText>상품을 불러오는 중...</LoadingText>;
  if (products.length === 0) return <EmptyText>상품이 없습니다.</EmptyText>;

  return (
    <CardGrid>
      {products.map((product, index) => (
        <ProductCard key={product.id} {...product} rank={index + 1} />
      ))}
    </CardGrid>
  );
};

export default ThemeProductList;

const LoadingText = styled.p`
  padding: ${({ theme }) => theme.spacing[4]};
  text-align: center;
`;

const ErrorText = styled.p`
  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.color.red[500]};
  text-align: center;
`;

const EmptyText = styled.p`
  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.color.gray[500]};
  text-align: center;
`;
