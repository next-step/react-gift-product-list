/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../styles/theme';

type ThemeHeroProps = {
  name: string;
  title?: string;
  description?: string;
  backgroundColor?: string;
};

const containerStyle = (backgroundColor?: string) => css`
  display: flex;
  align-items: center;
  padding: ${theme.spacing[4]};
  border-bottom: 1px solid #eee;
  background-color: ${backgroundColor ?? 'transparent'};
  margin-top: -${theme.spacing[12]};
  padding-top: calc(${theme.spacing[3]} + ${theme.spacing[12]});
`;

const textWrapper = css`
  display: flex;
  flex-direction: column;
`;

const nameStyle = css`
  font-size: ${theme.typography.subtitle2Bold.fontSize};
  font-weight: ${theme.typography.subtitle2Bold.fontWeight};
  line-height: ${theme.typography.subtitle2Bold.lineHeight};
  margin-bottom: ${theme.spacing[1]};
  color: ${theme.color.gray.gray00};
`;

const titleStyle = css`
  font-size: ${theme.typography.title1Bold.fontSize};
  font-weight: ${theme.typography.title1Bold.fontWeight};
  line-height: ${theme.typography.title1Bold.lineHeight};
  margin-bottom: ${theme.spacing[1]};
  color: ${theme.color.gray.gray00};
`;

const descriptionStyle = css`
  font-size: ${theme.typography.body2Regular.fontSize};
  font-weight: ${theme.typography.body2Regular.fontWeight};
  line-height: ${theme.typography.body2Regular.lineHeight};
  color: ${theme.color.gray.gray00};
`;

const ThemeHero = ({
  name,
  title,
  description,
  backgroundColor,
}: ThemeHeroProps) => {
  return (
    <section css={containerStyle(backgroundColor)}>
      <div css={textWrapper}>
        <h2 css={nameStyle}>{name}</h2>
        {title && <h3 css={titleStyle}>{title}</h3>}
        {description && <p css={descriptionStyle}>{description}</p>}
      </div>
    </section>
  );
};

export default ThemeHero;
