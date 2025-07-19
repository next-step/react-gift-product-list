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
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { getThemes } from "@/data/api";
import { useFetch } from "@/hooks/useFetch";
import type { GiftThemeType } from "@/types/GiftThemeType";

function CategoryContent() {
  const { data, isLoading, isError } = useFetch<GiftThemeType[]>({
    fetchFn: getThemes,
    errorHandler: () => {
      console.error(CATEGORY_ERROR_MESSAGE.DATA_LOADING_ERROR);
    },
    validateData: [(data) => data.length > 0],
  });

  if (isError) {
    return (
      <ErrorContainer>
        <ErrorMessage>{CATEGORY_ERROR_MESSAGE.DATA_LOADING_ERROR}</ErrorMessage>
      </ErrorContainer>
    );
  }

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  return (
    <ThemeGrid>
      {data?.map((theme) => (
        <ThemeCard
          key={theme.themeId}
          themeId={theme.themeId}
          name={theme.name}
          image={theme.image}
        />
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
