import styled from '@emotion/styled';
import type { ThemeProductsData } from '..';
interface GridSectionProps {
  themeProducts?: ThemeProductsData;
}
const GridSection = ({ themeProducts }: GridSectionProps) => {
  console.log(themeProducts);
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
