import styled from '@emotion/styled';

export const StyledPresentRankingContainer = styled.div`
  background-color: ${({ theme }) => theme.sementicPalette.backgroundDefault};
`;

export const StyledPrsentRankingDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`;
export const StyledPresenetRankingAddItemBtnDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: ${({ theme }) => theme.spacing.spacing2} 0px ${({ theme }) => theme.spacing.spacing10} 0px;
`;
export const StyledPresenetRankingAddItemBtn = styled.button`
  width: 80%;
  height: 80%;
  padding: ${({ theme }) => theme.spacing.spacing5};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.sementicPalette.backgroundDefault};
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.palette.gray500};
`;
export const StyledPresentRankingContainerTitle = styled.p`
  ${({ theme }) => theme.typography.title1Bold};
  padding: ${({ theme }) => theme.spacing.spacing2};
`;
