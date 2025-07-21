import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { ThemeHeroSection } from "./section/ThemeHeroSection";
import { ProductListSection } from "./section/ProductListSection";

export default function ThemePage() {
  const { themeId } = useParams();
  const numericThemeId = Number(themeId);

  return (
    <Wrapper>
      <ThemeHeroSection themeId={numericThemeId} />
      <ProductListSection themeId={numericThemeId} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-bottom: 48px;
`;
