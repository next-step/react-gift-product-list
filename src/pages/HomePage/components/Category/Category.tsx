import ThemeCard from "./ThemeCard";
import { CATEGORY_ERROR_MESSAGE, CATEGORY_LABELS } from "./constants/labels";
import {
  ErrorContainer,
  ErrorMessage,
  GiftThemeSection,
  LoadingContainer,
  SectionHeader,
  SectionTitle,
  ThemeGrid,
} from "./Category.styles";
import { useEffect, useState } from "react";
import axios from "axios";
import type { FetchState } from "@/types/FetchState";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

interface GiftTheme {
  themeId: number;
  name: string;
  image: string;
}

function CategoryContent() {
  const [fetchState, setFetchState] = useState<FetchState<GiftTheme>>({
    data: null,
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    const fetchGiftThemes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/themes`
        );
        const giftThemes = response.data.data;

        if (giftThemes.length === 0) {
          setFetchState({
            data: null,
            isLoading: false,
            isError: true,
          });
          return;
        }

        setFetchState({
          data: giftThemes,
          isLoading: false,
          isError: false,
        });
      } catch (error) {
        console.error(CATEGORY_ERROR_MESSAGE.DATA_LOADING_ERROR, error);
        setFetchState({
          data: null,
          isLoading: false,
          isError: true,
        });
      }
    };

    fetchGiftThemes();
  }, []);

  if (fetchState.isError) {
    return (
      <ErrorContainer>
        <ErrorMessage>{CATEGORY_ERROR_MESSAGE.DATA_LOADING_ERROR}</ErrorMessage>
      </ErrorContainer>
    );
  }

  if (fetchState.isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  return (
    <ThemeGrid>
      {fetchState.data?.map((theme) => (
        <ThemeCard key={theme.themeId} name={theme.name} image={theme.image} />
      ))}
    </ThemeGrid>
  );
}

function Category() {
  return (
    <GiftThemeSection>
      <SectionHeader>
        <SectionTitle>{CATEGORY_LABELS.SECTION_TITLE}</SectionTitle>
      </SectionHeader>
      <CategoryContent />
    </GiftThemeSection>
  );
}

export default Category;
