import { useEffect, useState } from 'react';
import type { ProductData } from '@/apis/domain/products/type';
import styled from '@emotion/styled';
import { Typography } from '@/components/common/Typography';
import { getPath } from '@/pages/Routes';
import { BaseProductListItem } from '@/components/ProductListItem/Base';
import { Link } from 'react-router';
import { useRead } from '@/hooks/useRead';
import { getThemeProducts } from '@/apis/domain/themes/getThemeProducts';
import { Spinner } from '@/components/common/Spinner';
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import { useInView } from '@/hooks/useInView';

type Props = {
  themeId: string;
};

export const ThemeProductListSection = ({ themeId }: Props) => {
  const [productList, setProductList] = useState<ProductData[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [cursor, setCursor] = useState(0);

  const { data, isLoading, refetch } = useRead({
    fetch: getThemeProducts,
    initFetchParams: { themeId, cursor, limit: 20 },
  });

  useEffect(() => {
    if (isLoading) return;
    if (!data) return;

    const { list, cursor, hasMoreList } = data.data;

    setProductList((prev) => [...prev, ...list]);
    setHasNextPage(hasMoreList);
    setCursor(cursor);
  }, [isLoading]);

  const fetchNextPage = () => {
    if (!hasNextPage) return;
    if (isLoading) return;

    refetch({
      themeId,
      cursor,
      limit: 20,
    });
  };

  const { ref: observerRef } = useInView({
    callback: fetchNextPage,
  });

  const isEmpty = productList.length <= 0;

  if (isLoading && isEmpty) {
    return (
      <EmptyWrapper>
        <Spinner size='large' color='kakaoBrown' />
      </EmptyWrapper>
    );
  }

  if (isEmpty) {
    return (
      <EmptyWrapper>
        <Typography variant='label1Regular' color='default' width='100%' textAlign='center'>
          상품이 없습니다.
        </Typography>
      </EmptyWrapper>
    );
  }

  return (
    <Wrapper>
      <List>
        {productList.map((product) => (
          <Link to={getPath.order(product.id.toString())} key={product.id}>
            <BaseProductListItem
              key={product.id}
              imageSrc={product.imageURL}
              title={product.name}
              subtitle={product.brandInfo.name}
              amount={product.price.sellingPrice}
            />
          </Link>
        ))}
      </List>
      {hasNextPage && (
        <Wrapper ref={observerRef} style={{ display: 'flex', justifyContent: 'center' }}>
          <HorizontalSpacing size='spacing1' />
          <Spinner size='medium' color='kakaoBrown' />
          <HorizontalSpacing size='spacing1' />
        </Wrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing4};
  width: 100%;
`;

const EmptyWrapper = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = styled.div(({ theme }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: `${theme.spacing.spacing6} ${theme.spacing.spacing2}`,
}));
