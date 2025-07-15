import ThemeCard from "./ThemeCard";
import { CATEGORY_ERROR_MESSAGE, CATEGORY_LABELS } from "./constants/labels";
import {
  GiftThemeSection,
  LoadingContainer,
  LoadingSpinner,
  SectionHeader,
  SectionTitle,
  ThemeGrid,
} from "./Category.styles";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";

interface GiftTheme {
  themeId: number;
  name: string;
  image: string;
}

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 124px;
  margin-bottom: 124px;
`;

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label1Regular.fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.label.label1Regular.fontWeight};
`;

function Category() {
  const [giftThemes, setGiftThemes] = useState<GiftTheme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchGiftThemes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/themes`
        );
        if (response.data.data.length === 0) {
          setIsError(true);
        } else {
          setGiftThemes(response.data.data);
          setIsError(false);
        }
      } catch (error) {
        console.error(CATEGORY_ERROR_MESSAGE.FETCH_ERROR, error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGiftThemes();
  }, []);

  return (
    <GiftThemeSection>
      <SectionHeader>
        <SectionTitle>{CATEGORY_LABELS.SECTION_TITLE}</SectionTitle>
      </SectionHeader>
      {isError ? (
        <ErrorContainer>
          <ErrorMessage>데이터를 불러오는 중 에러가 발생했어요</ErrorMessage>
        </ErrorContainer>
      ) : isLoading ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : (
        <ThemeGrid>
          {giftThemes.map((theme) => (
            <ThemeCard
              key={theme.themeId}
              name={theme.name}
              image={theme.image}
            />
          ))}
        </ThemeGrid>
      )}
    </GiftThemeSection>
  );
}

export default Category;
