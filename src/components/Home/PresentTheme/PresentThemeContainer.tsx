import styled from '@emotion/styled';
import PresentThemeItem from './PresentThemeItem';

const StyledPresentContainer = styled.div`
  background-color: ${({ theme }) => theme.sementicPalette.backgroundDefault};
  padding-top: ${({ theme }) => theme.spacing.spacing6};
`;

const StyledExtraContainer = styled.div`
  background-color: ${({ theme }) => theme.sementicPalette.kakaoYellow};
  margin: ${({ theme }) => theme.spacing.spacing3} ${({ theme }) => theme.spacing.spacing3} 0px
    ${({ theme }) => theme.spacing.spacing3};
  border-radius: ${({ theme }) => theme.spacing.spacing5};
  padding: ${({ theme }) => theme.spacing.spacing4};
`;
const StyledExtraFristP = styled.div`
  color: ${({ theme }) => theme.sementicPalette.textSub};
  ${({ theme }) => theme.typography.label1Regular};
`;
const StyledExtraSecondP = styled.div`
  color: ${({ theme }) => theme.sementicPalette.textDefault};
  ${({ theme }) => theme.typography.label1Bold};
`;

const PresentThemeConatiner = () => {
  return (
    <StyledPresentContainer>
      <PresentThemeItem />
      <StyledExtraContainer>
        <StyledExtraFristP>카카오테크 캠퍼스 3기여러분</StyledExtraFristP>
        <StyledExtraSecondP>프론트엔드 2단계 과제 화이팅!</StyledExtraSecondP>
      </StyledExtraContainer>
    </StyledPresentContainer>
  );
};

export default PresentThemeConatiner;
