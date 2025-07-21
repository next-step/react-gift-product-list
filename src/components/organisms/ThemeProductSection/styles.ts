import styled from '@emotion/styled';

export const Section = styled.section`
  padding: ${({ theme }) => `${theme.spacing.spacing6} ${theme.spacing.spacing4}`};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing3};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
  width: 100%;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing.spacing12} ${theme.spacing.spacing4}`};
  ${({ theme }) => theme.typography.body1Regular}
  color: ${({ theme }) => theme.semantic.text.sub};
`;

export const LoadingMore = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.spacing6};
`; 