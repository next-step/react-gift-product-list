import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@/components/common/Typography';
import { ProductCard } from './ProductCard';
import { useFetchThemeProducts } from '@/hooks/useFetchThemeProducts';

export const ProductList: React.FC<{ themeId: number }> = ({ themeId }) => {
  const { products, hasMore, loading, observerRef } = useFetchThemeProducts(themeId);

  if (!loading && products.length === 0) {
    return (
      <Section>
        <Typography>등록된 상품이 없습니다.</Typography>
      </Section>
    );
  }

  return (
    <>
      <Grid>
        {products.map(p => (
          <ProductCard
            key={p.id}
            image={p.imageURL}
            name={p.name}
            price={p.price.sellingPrice}
            brandName={p.brandInfo.name}
          />
        ))}
      </Grid>

      <div ref={observerRef} />

      {loading && (
        <Section>
          <Typography>로딩 중…</Typography>
        </Section>
      )}
    </>
  );
};

const Grid = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: theme.spacing.spacing3,
}));

const Section = styled.section(({ theme }) => ({
  padding: `${theme.spacing.spacing4} ${theme.spacing.spacing2}`,
  textAlign: 'center',
}));
