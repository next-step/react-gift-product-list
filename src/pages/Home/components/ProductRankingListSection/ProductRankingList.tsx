import styled from '@emotion/styled';
import { RankingProductListItem } from '@/components/ProductListItem/Ranking';
import { useState } from 'react';
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import { Typography } from '@/components/common/Typography';
import { getPath } from '@/pages/Routes';
import { Link } from 'react-router';
import type { ProductData } from '@/apis/domain/products/type';

type Props = {
  productList: ProductData[];
};

export const ProductRankingList = ({ productList }: Props) => {
  const [isMore, setIsMore] = useState(false);

  if (productList.length <= 0) {
    return (
      <EmptyWrapper>
        <Typography variant='label1Regular' color='default' width='100%' textAlign='center'>
          상품이 없습니다.
        </Typography>
      </EmptyWrapper>
    );
  }

  const currentProductList = isMore ? productList : productList.slice(0, 6);

  return (
    <Wrapper>
      <List>
        {currentProductList.map((product, index) => (
          <Link to={getPath.order(product.id.toString())}>
            <RankingProductListItem
              key={product.id}
              rankingIndex={index + 1}
              imageSrc={product.imageURL}
              title={product.name}
              subtitle={product.brandInfo.name}
              amount={product.price.sellingPrice}
            />
          </Link>
        ))}
      </List>
      <HorizontalSpacing size='spacing8' />
      <ButtonWrapper>
        <Button onClick={() => setIsMore(!isMore)}>
          <Typography variant='label1Regular' color='default' width='100%' textAlign='center'>
            {isMore ? '접기' : '더보기'}
          </Typography>
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Button = styled.button(({ theme }) => ({
  maxWidth: '30rem',
  width: '100%',
  padding: theme.spacing.spacing3,
  borderRadius: '4px',
  border: `1px solid ${theme.colors.scale.gray400}`,
}));
