import styled from '@emotion/styled';

export const StyledPresentRankingItemBrandName = styled.p`
  color: ${({ theme }) => theme.palette.gray600};
  padding: ${({ theme }) => theme.spacing.spacing1};
`;
export const StyledPresentRankingItemDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
export const StyledPresentRankingItemImage = styled.img`
  position: relative;
  width: 100%;
`;

export const StyledPresentRankingItemPrasentPrice = styled.p`
  color: ${({ theme }) => theme.typography.body2Bold};
  padding-left: ${({ theme }) => theme.spacing.spacing1};
  padding-top: ${({ theme }) => theme.spacing.spacing2};
`;
export const StyledPresentRankingItemPresentItem = styled.p`
  color: ${({ theme }) => theme.typography.body2Regular};
  padding-left: ${({ theme }) => theme.spacing.spacing1};
`;
export const StyledPresentRankingNumContainer = styled.div<{ index: number }>`
  position: absolute;
  background-color: ${({ index, theme }) =>
    index <= 3 ? theme.palette.red600 : theme.palette.gray600};
  width: 20px;
  height: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
  border-radius: 2px;
  color: ${({ theme }) => theme.palette.blue00};
  ${({ theme }) => theme.typography.label2Bold}
`;
