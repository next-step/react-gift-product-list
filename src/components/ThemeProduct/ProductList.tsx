import { getThemeProducts, type ProductItem } from '@/Api/api';
import { ROUTE_PATH } from '@/routes/Routes';
import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import LoadingSpinner from '@components/common/LoadingSpinner';

const Container = styled.div`
  padding: 16px;
  width: 100%;
`;

const Main = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 8px;
`;

const LoadMore = styled.button`
  margin: 24px auto 0;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: #e3e4e5;
  cursor: pointer;
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`;

const Empty = styled.p(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: '1.1875rem',
  color: theme.semanticColors.text.default,
  margin: '0px',
  width: '100%',
  textAlign: 'center',
}));
interface Props {
  themeId: number;
}

const ProductList = ({ themeId }: Props) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProducts([]);
    setCursor(0);
    setHasMore(true);
    fetchProducts(0);
  }, [themeId]);

  const fetchProducts = async (cur = cursor) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const { list, cursor: next, hasMoreList } = await getThemeProducts(themeId, cur);
      setProducts((prev) => [...prev, ...list]);
      setCursor(next);
      setHasMore(hasMoreList);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        navigate(ROUTE_PATH.HOME, { replace: true });
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!loading && products.length === 0) {
    return (
      <EmptyContainer>
        <Empty>상품이 없습니다.</Empty>
      </EmptyContainer>
    );
  }
  return (
    <Container>
      <Main>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Main>

      {loading && <LoadingSpinner />}

      {!loading && hasMore && <LoadMore onClick={() => fetchProducts(cursor)}>더 보기</LoadMore>}
    </Container>
  );
};

export default ProductList;
