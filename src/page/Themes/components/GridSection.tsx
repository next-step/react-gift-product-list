import styled from '@emotion/styled';
import type { ProductData, ThemeIdProductsData } from '..';
import ProductBox from './Product';

interface GridSectionProps {
  themeIdProducts?: ThemeIdProductsData;
}

const GridSection = ({ themeIdProducts }: GridSectionProps) => {
  if (!themeIdProducts) return null;
  const { list, cursor, hasMoreList } = themeIdProducts;
  console.log(cursor, hasMoreList);

  return (
    <Container>
      <GridContainer>
        {list.map((product: ProductData) => (
          <ProductBox key={product.id} product={product} />
        ))}
      </GridContainer>
    </Container>
  );
};

export default GridSection;

const Container = styled.div`
  padding: 16px;
  width: 100%;
`;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 8px;
`;
