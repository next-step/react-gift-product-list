import useFetch from '@hooks/useFetch';
import ProductCard from './ProductCard';
import styled from '@emotion/styled';
import LoadingSpinner from '@components/common/LoadingSpinner';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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

interface ThemeProducts {
  list: ThemeProduct[];
  cursor: number;
  hasMoreList: boolean;
}

const ProductList = ({ id }: { id: string }) => {
  const { data, loading, error } = useFetch<ThemeProducts>(
    `/themes/${id}/products`
  );
  console.log(data);

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

  if (loading) return <LoadingSpinner />;

  if (!data?.list || data.list.length === 0)
    return <EmptyMessage>상품이 없습니다.</EmptyMessage>;

  return (
    <GridWrqpper>
      {data?.list.map((item, index) => (
        <ProductCard key={index} {...item} />
      ))}
    </GridWrqpper>
  );
};

export default ProductList;

const GridWrqpper = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing.spacing5,
  padding: theme.spacing.spacing6,
}));

const EmptyMessage = styled.div(({ theme }) => ({
  ...theme.typography.body1Regular,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '28.75rem',
}));
