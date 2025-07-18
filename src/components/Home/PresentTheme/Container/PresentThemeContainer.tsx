import PresentThemeItem from '@components/Home/PresentTheme/Item/PresentThemeItem';
import {
  StyledExtraContainer,
  StyledExtraFristP,
  StyledExtraSecondP,
  StyledPresentContainer,
} from '@src/components/Home/PresentTheme/Container/StyledPresentThemeContainer';

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
