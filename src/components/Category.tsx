import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";

const themeURL = import.meta.env.VITE_API_BASE_URL_THEME;

type ThemeItem = {
  themeId: string;
  image: string;
  name: string;
};

const Category = () => {
  const theme = useTheme();
  const [themeData, setThemeData] = useState<ThemeItem[] | null>(null);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get(themeURL);

        setThemeData(response.data.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchTheme();
  }, []);

  console.log(themeData);

  return (
    <div css={categoryStyle(theme)}>
      {themeData &&
        themeData.map((themeInfo) => (
          <div
            css={categoryItemStyle(theme)}
            key={themeInfo.themeId}
            className="category-item"
          >
            <img
              src={themeInfo.image}
              alt={themeInfo.name}
              className="category-image"
              css={imageStyle}
            />
            <h3 className="category-name">{themeInfo.name}</h3>
          </div>
        ))}
    </div>
  );
};

const categoryStyle = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  font-size: ${theme.typography.label2Bold.size};
  font-weight: ${theme.typography.label2Bold.weight};
  line-height: ${theme.typography.label2Bold.lineHeight};
  text-align: center;
  padding: ${theme.spacing.spacing3} ${theme.spacing.spacing4};
  background: ${theme.colors.semantic.background.default};
  border-bottom: 1px solid ${theme.colors.semantic.border.default};
`;

const categoryItemStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${theme.colors.semantic.text.default};
`;

const imageStyle = () => css`
  width: 50%;
  max-width: 50px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
  border-radius: 8px;
  cursor: pointer;
`;

export default Category;
