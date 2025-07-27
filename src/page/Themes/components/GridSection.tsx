import styled from '@emotion/styled';
import type { ItemData } from '..';
import ProductBox from './Item';
import useThemeItems from '../hooks/useThemeItems';

const GridSection = () => {
  const { items, hasMore, loader } = useThemeItems();

  if (!hasMore && !items.length) {
    return <Container>상품이 없습니다.</Container>;
  }

  return (
    <Container>
      <GridContainer>
        {items.map((item: ItemData) => (
          <ProductBox key={item.id} item={item} />
        ))}
        <div ref={loader} />
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
