import styled from '@emotion/styled';

export const StyledPresentContainer = styled.div`
  background-color: ${({ theme }) => theme.sementicPalette.backgroundDefault};
  padding-top: ${({ theme }) => theme.spacing.spacing6};
`;
export const StyledExtraContainer = styled.div`
  background-color: ${({ theme }) => theme.sementicPalette.kakaoYellow};
  margin: ${({ theme }) => theme.spacing.spacing3} ${({ theme }) => theme.spacing.spacing3} 0px
    ${({ theme }) => theme.spacing.spacing3};
  border-radius: ${({ theme }) => theme.spacing.spacing5};
  padding: ${({ theme }) => theme.spacing.spacing4};
`;
export const StyledExtraFristP = styled.div`
  color: ${({ theme }) => theme.sementicPalette.textSub};
  ${({ theme }) => theme.typography.label1Regular};
`;
export const StyledExtraSecondP = styled.div`
  color: ${({ theme }) => theme.sementicPalette.textDefault};
  ${({ theme }) => theme.typography.label1Bold};
`;
