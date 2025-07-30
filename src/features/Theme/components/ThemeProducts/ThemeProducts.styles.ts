import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const Container = styled.div`
  background: ${theme.colors.semanticColor.backgroundColor.default};
  margin-top: ${theme.spacing[7]};
`;
export const NoProduct = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${theme.typography.body2Regular};
  text-align: center;
`;

export const ErrorText = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${theme.typography.body2Regular};
  color: ${theme.colors.semanticColor.stateColor.critical};
  text-align: center;
`;
