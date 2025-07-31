import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import React from 'react';

type FontSizeKey = keyof typeof theme.typography.fontSizes;
type FontWeightKey = keyof typeof theme.typography.fontWeights;

interface TextProps {
  size?: FontSizeKey;
  weight?: FontWeightKey;
  children: React.ReactNode;
  color?: string;
}

const Text = ({
  size = 'body1',
  weight = 'regular',
  color = '#000000',
  children,
}: TextProps) => {
  return (
    <StyledText size={size} weight={weight} color={color}>
      {children}
    </StyledText>
  );
};

const StyledText = styled.div<{ size: FontSizeKey; weight: FontWeightKey }>`
  font-size: ${({ theme, size }) => theme.typography.fontSizes[size]};
  font-weight: ${({ theme, weight }) => theme.typography.fontWeights[weight]};
  color: ${({ color }) => color};
`;

export default Text;
