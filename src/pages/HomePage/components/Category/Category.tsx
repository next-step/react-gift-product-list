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

interface GiftTheme {
  themeId: number;
  name: string;
  image: string;
}

function Category() {
  const [giftThemes, setGiftThemes] = useState<GiftTheme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGiftThemes = async () => {
      try {
        // 로딩 테스트
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/themes`
        );
        setGiftThemes(response.data.data);
      } catch (error) {
        console.error(CATEGORY_ERROR_MESSAGE.FETCH_ERROR, error);
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
      {isLoading ? (
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
