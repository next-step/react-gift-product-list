import styled from "@emotion/styled";
import Container from "@/components/common/Container";
import HeroSection from "@/pages/Themes/components/HeroSection";
import ProductList from "@/pages/Themes/components/ProductList";

const ThemesPage = () => {
  return (
    <Container>
      <Contents>
        <HeroSection />
        <ProductList />
      </Contents>
    </Container>
  );
};

export default ThemesPage;

const Contents = styled.div`
  width: 100%;
  height: 100%;
`;
