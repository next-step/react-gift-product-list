import styled from '@emotion/styled';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing2};
`;

//API 상태용
export const LoadingMessage = styled.p`
  text-align: center;
  padding: 40px 0;
  ${({ theme }) => theme.typography.body1Bold};
  color: ${({ theme }) => theme.color.text.sub};
`;

export const ErrorMessage = styled.p`
  text-align: center;
  padding: 40px 0;
  ${({ theme }) => theme.typography.body1Bold};
  color: ${({ theme }) => theme.color.state.critical};
`;

export const NoProductMessage = styled.p`
  text-align: center;
  padding: 40px 0;
  ${({ theme }) => theme.typography.body1Regular};
  color: ${({ theme }) => theme.color.text.sub};
`;
