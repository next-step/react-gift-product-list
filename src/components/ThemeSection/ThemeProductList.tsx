import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import ProductCard from '@/components/RankingSection/ProductCard';
import CardGrid from '@/components/common/CardGrid';
import { ERROR_MESSAGES } from '@/constants/validation';
import { loading } from '@/components/common/Loading';
import { useThemeProducts } from '@/hooks/useThemeProducts';
import WithApiUi from '@/components/common/WithApiUi';

const ThemeProductList = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const { products, pending, error, hasMore, observerRef } =
    useThemeProducts(themeId);

  return (
    <WithApiUi
      data={products}
      error={error}
      loading={<EmptyText>{ERROR_MESSAGES.NO_PRODUCTS_AVAILABLE}</EmptyText>}
      errorFallback={
        <ErrorText>{ERROR_MESSAGES.FAILED_TO_LOAD_PRODUCTS}</ErrorText>
      }
    >
      <Wrapper>
        <CardGrid>
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              {...product}
              rank={index + 1}
              hideRank
            />
          ))}
        </CardGrid>
        {pending && loading}
        {hasMore && <ObserverTarget ref={observerRef} />}
      </Wrapper>
    </WithApiUi>
  );
};

export default ThemeProductList;

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
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

const ObserverTarget = styled.div`
  height: 1px;
`;
