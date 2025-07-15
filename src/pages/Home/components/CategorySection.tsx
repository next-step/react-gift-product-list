/** @jsxImportSource @emotion/react */
import { css, useTheme, type Theme as ThemeType } from '@emotion/react';
import { useEffect, useState } from 'react';
import CategoryItem from './Shared/CategoryItem';
import theme from '../../../styles/theme';
import { fetchThemes, type Category } from '../../../apis/theme';

const sectionStyle = css`
  padding: ${theme.spacing[6]};
`;

const titleStyle = (theme: ThemeType) => css`
  margin-bottom: ${theme.spacing[4]};
  color: ${theme.color.semantic.textDefault};
  font-size: ${theme.typography.title1Bold.fontSize};
  font-weight: ${theme.typography.title1Bold.fontWeight};
  line-height: ${theme.typography.title1Bold.lineHeight};
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 60px;
  row-gap: ${theme.spacing[4]};
  padding: 0 ${theme.spacing[4]};
`;

const CategorySection = () => {
  const theme = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchThemes();
        if (data.length === 0) {
          setError(true);
        } else {
          setCategories(data);
          setError(false);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error || categories.length === 0) {
    return null;
  }

  return (
    <section css={sectionStyle}>
      <h2 css={titleStyle(theme)}>선물 테마</h2>
      <div css={gridStyle}>
        {categories.map(({ themeId, name, image }) => (
          <CategoryItem key={themeId} themeId={themeId} name={name} image={image} theme={theme} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
