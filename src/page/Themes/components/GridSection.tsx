import styled from '@emotion/styled';
import type { ThemeIdProductsData } from '..';

interface GridSectionProps {
  themeIdProducts?: ThemeIdProductsData;
}
const GridSection = ({ themeIdProducts }: GridSectionProps) => {
  console.log('GridSection', themeIdProducts);
  return (
    <Container>
      <GridContainer></GridContainer>
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
