/** @jsxImportSource @emotion/react */
import { css, keyframes, useTheme } from "@emotion/react";
import type { ThemeType } from "@/styles/theme/theme";

type SpinnerProps = {
  size?: number;
};

export const Spinner = ({ size = 45 }: SpinnerProps) => {
  const theme = useTheme() as ThemeType;

  return (
    <div
      css={spinnerStyle(theme, size)}
      role="status"
      aria-label="로딩 중.."
    />
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const spinnerStyle = (theme: ThemeType, size: number) => css`
  width: ${size}px;
  height: ${size}px;
  border: 4px solid ${theme.colors.gray200};
  border-top: 4px solid ${theme.colors.blue500};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
