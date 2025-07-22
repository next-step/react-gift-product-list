import {
  StyledImage,
  StyledPresentThemeDiv,
  StyledPresentThemeItemDiv,
  StyledPresentThemeItemP,
} from '@src/components/Home/PresentTheme/Item/StyledPresnetThemeItem';
import { StyledPresentThemeCommonP } from '@src/components/Home/PresentTheme/StyledPresentThemeCommonP';
import { usePresentTheme } from '../../../../hooks/usePresentTheme';
import type { Theme } from './ThemeType';

const PresentThemeItem = () => {
  const { themes, isLoading, isError } = usePresentTheme();

  if (isLoading) {
    return <div>Loading</div>;
  } else if (isError) {
    return <>{alert('에러 발생')}</>;
  } else {
    return (
      <>
        <StyledPresentThemeCommonP>선물 테마</StyledPresentThemeCommonP>
        <StyledPresentThemeDiv>
          {themes &&
            themes.data?.map((item: Theme) => (
              <StyledPresentThemeItemDiv key={item.themeId} className='border'>
                <StyledImage src={item.image} alt={item.name} />
                <StyledPresentThemeItemP>{item.name}</StyledPresentThemeItemP>
              </StyledPresentThemeItemDiv>
            ))}
        </StyledPresentThemeDiv>
      </>
    );
  }
};

export default PresentThemeItem;
