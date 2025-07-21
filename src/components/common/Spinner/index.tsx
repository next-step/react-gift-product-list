import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import type { Theme } from '@emotion/react';
import { theme } from '@/styles/theme';

type SpinnerProps = {
  size?: 'small' | 'medium' | 'large' | number;
  color?: ColorKeys;
};

type ScaleColorKeys = keyof typeof theme.colors.scale;
type BrandColorKeys = keyof typeof theme.colors.semantic.brand;
type TextColorKeys = keyof typeof theme.colors.semantic.text;
type CriticalInfoColorKeys = 'critical' | 'info';

type ColorKeys = ScaleColorKeys | BrandColorKeys | TextColorKeys | CriticalInfoColorKeys;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const getSizeValue = (size: SpinnerProps['size']) => {
  if (typeof size === 'number') {
    return `${size}px`;
  }

  switch (size) {
    case 'small':
      return '16px';
    case 'medium':
      return '24px';
    case 'large':
      return '32px';
    default:
      return '24px';
  }
};

const getColor = (colorKey: ColorKeys, theme: Theme) => {
  if (colorKey in theme.colors.scale) {
    return theme.colors.scale[colorKey as keyof typeof theme.colors.scale];
  }

  if (colorKey in theme.colors.semantic.brand) {
    return theme.colors.semantic.brand[colorKey as keyof typeof theme.colors.semantic.brand];
  }

  if (colorKey in theme.colors.semantic.text) {
    return theme.colors.semantic.text[colorKey as keyof typeof theme.colors.semantic.text];
  }

  if (colorKey === 'critical') {
    return theme.colors.semantic.critical.default;
  }

  if (colorKey === 'info') {
    return theme.colors.semantic.info.default;
  }

  return theme.colors.semantic.brand.kakaoYellow;
};

export const Spinner = ({ size = 'medium', color = 'kakaoYellow' }: SpinnerProps) => {
  return <StyledSpinner size={size} colorKey={color} />;
};

const StyledSpinner = styled.div<{
  size: SpinnerProps['size'];
  colorKey: ColorKeys;
}>(({ size, colorKey, theme }) => {
  const sizeValue = getSizeValue(size);
  const borderWidth = typeof size === 'number' ? Math.max(3, size / 6) : 3;

  return {
    width: sizeValue,
    height: sizeValue,
    border: `${borderWidth}px solid transparent`,
    borderTop: `${borderWidth}px solid ${getColor(colorKey, theme)}`,
    borderRadius: '50%',
    animation: `${spin} 700ms linear infinite`,
    display: 'inline-block',
  };
});
