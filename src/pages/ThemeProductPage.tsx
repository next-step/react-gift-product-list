import {
  ThemeProductGrid,
  ThemeProductHero,
  ThemeProductPageLayout,
} from "@/components/themes";
import { useParams } from "react-router-dom";

export const ThemeProductPage = () => {
  const { id: themeId } = useParams<{ id: string }>();
  return (
    <ThemeProductPageLayout>
      <ThemeProductHero themeId={Number(themeId)} />
      <ThemeProductGrid themeId={Number(themeId)} />
    </ThemeProductPageLayout>
  );
};
