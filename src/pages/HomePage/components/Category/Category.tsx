import ThemeCard from "./ThemeCard";
import { CATEGORY_ERROR_MESSAGE, CATEGORY_LABELS } from "./constants/labels";
import {
  GiftThemeSection,
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

  useEffect(() => {
    const fetchGiftThemes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/themes");
        setGiftThemes(response.data.data);
      } catch (error) {
        console.error(CATEGORY_ERROR_MESSAGE.FETCH_ERROR, error);
      }
    };

    fetchGiftThemes();
  }, []);

  return (
    <GiftThemeSection>
      <SectionHeader>
        <SectionTitle>{CATEGORY_LABELS.SECTION_TITLE}</SectionTitle>
      </SectionHeader>
      <ThemeGrid>
        {giftThemes.map((theme) => (
          <ThemeCard
            key={theme.themeId}
            name={theme.name}
            image={theme.image}
          />
        ))}
      </ThemeGrid>
    </GiftThemeSection>
  );
}

export default Category;
