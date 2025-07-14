import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.semantic.background.default};
  padding: ${({ theme }) => theme.spacing.spacing2};
  border: 1px solid ${({ theme }) => theme.semantic.background.fill};
`;

export const FormContent = styled.div`
  width: 100%;
`;

