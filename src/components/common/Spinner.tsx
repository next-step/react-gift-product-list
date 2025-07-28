import styled from '@emotion/styled';
import type { CSSProperties } from 'react';

export interface SpinnerProps {
  size?: CSSProperties['width'];
  borderWidth?: CSSProperties['borderWidth'];
  color?: CSSProperties['borderColor'];
}

export const Spinner = ({ borderWidth = '4px', size = '48px', color = '#000' }: SpinnerProps) => {
  return <SpinnerStyled borderWidth={borderWidth} size={size} color={color}></SpinnerStyled>;
};

const SpinnerStyled = styled.div<SpinnerProps>`
  display: inline-block;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border: ${({ borderWidth }) => borderWidth} solid ${({ color }) => color};
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
