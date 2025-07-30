/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useThemes } from '@/features/Gift/hooks/useThemes';
import Loading from '@/components/Loading/Loading';
import type { ThemeType } from '@/styles/theme';

const containerStyle = (theme: ThemeType) => css`
  margin: 16px 0;
  padding: 16px;
  background-color: ${theme.colors.colorScale.gray[0]};
`;

const titleStyle = css`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
  margin-top: 12px;
  gap: 13px;
`;

const itemStyle = css`
  text-align: center;
  cursor: pointer;
`;

const imageStyle = css`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const nameStyle = css`
  font-size: 12px;
  margin-top: 8px;
`;

const CategorySection = () => {
  const theme = useTheme();
  const { themes, loading, error } = useThemes();
  const navigate = useNavigate();

  const handleSelect = (themeId: number) => {
    navigate(`/themes/${themeId}`);
  };

  if (loading) return <Loading />;
  if (error || themes.length === 0) return null;

  return (
    <section css={containerStyle(theme)}>
      <h2 css={titleStyle}>선물 테마</h2>
      <div css={gridStyle}>
        {themes.map((theme) => (
          <div
            key={theme.themeId}
            css={itemStyle}
            onClick={() => handleSelect(theme.themeId)}
          >
            <img src={theme.image} alt={theme.name} css={imageStyle} />
            <p css={nameStyle}>{theme.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
