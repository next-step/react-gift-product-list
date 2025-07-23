import ProductCard from './ProductCard';
import styled from '@emotion/styled';
import LoadingSpinner from '@components/common/LoadingSpinner';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchThemeProducts } from '@apis/themeApi';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import EmptyMessage from '@components/common/EmptyMessage';

export interface ThemeProduct {
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

export interface ThemeProducts {
  list: ThemeProduct[];
  cursor: number;
  hasMoreList: boolean;
}

const ProductList = ({ id }: { id: string }) => {
  const [products, setProducts] = useState<ThemeProduct[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMoreList, setHasMoreList] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const isMounted = useRef(false);

  const fetchNextPage = async () => {
    if (!hasMoreList || isFetching) return;

    setIsFetching(true);
    setError(null);
    try {
      const data = await fetchThemeProducts(Number(id), cursor);
      setProducts((prev) => [...prev, ...data.list]);
      setCursor(data.cursor);
      setHasMoreList(data.hasMoreList);
    } catch (error) {
      console.log('상품 목록 불러오기 실패:', error);
      setError(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (error && axios.isAxiosError(error)) {
      const status = error.status;
      if (status === 404) {
        //중복 알람 위험 있음
        toast.error('해당 테마를 찾을 수 없습니다.');
      } else {
        toast.error(error.message);
      }
    }
  }, [error]);

  useEffect(() => {
    if (isMounted.current) return; //중복 호출 방지
    isMounted.current = true;
    fetchNextPage();
  }, []);

  const { sentinelRef } = useInfiniteScroll({
    fetchNextPage,
    hasMoreList,
    isFetching,
  });

  if (isFetching && products.length === 0) return <LoadingSpinner />;

  if (!isFetching && products.length === 0)
    return <EmptyMessage>상품이 없습니다.</EmptyMessage>;

  return (
    <>
      <GridWrqpper>
        {products.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </GridWrqpper>
      {hasMoreList && <div ref={sentinelRef} style={{ height: '1px' }} />}
    </>
  );
};

export default ProductList;

const GridWrqpper = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing.spacing5,
  padding: theme.spacing.spacing6,
}));
