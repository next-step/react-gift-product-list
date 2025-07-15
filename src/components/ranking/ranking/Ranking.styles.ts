import styled from '@emotion/styled';

export const RankingWrapper = styled.section`
  align-items: left;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing4} ${({ theme }) => theme.spacing.spacing3};
`;
export const RankingTitle = styled.h3`
  ${({ theme }) => theme.typography.title1Bold};

  color: ${({ theme }) => theme.colors.gray.gray900};
`;

export const RankingProducts = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing6} ${({ theme }) => theme.spacing.spacing2};
`;
export const ShowMoreBtn = styled.button`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray.gray400};
  padding: ${({ theme }) => theme.spacing.spacing4};
`;
