import { css } from '@emotion/react';
import { palette, typography } from '@/styles/theme';

interface Props {
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export const ThemeHeader = ({ name, title, description, backgroundColor }: Props) => (
  <header
    css={css`
      background-color: ${backgroundColor};
      padding: 20px;
      text-align: center;
      color: ${palette.white};
    `}
  >
    <h1 css={typography.subtitle2Regular.fontSize}>{name}</h1>
    <h3 css={typography.title1Bold.fontSize}>{title}</h3>
    <p css={typography.body2Regular.fontSize}>{description}</p>
  </header>
);

export default ThemeHeader;
