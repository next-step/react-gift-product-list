import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { theme } from '@/styles/theme';

const spin = keyframes`
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

export const Spinner = styled.div`
  border: ${theme.spacing[1]} solid ${theme.colors.colorScale.gray[400]};
  border-top: ${theme.spacing[1]} solid ${theme.colors.colorScale.gray[800]};
  border-radius: 50%;
  width: ${theme.spacing[10]};
  height: ${theme.spacing[10]};
  animation: ${spin} 1s linear infinite;
  margin: auto;
`;
