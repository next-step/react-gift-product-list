import { GiftThemeSection, Spinner, SpinnerWrapper, ThemeGrid, ThemeImage, ThemeItem, ThemeLabel } from './GiftTheme.styled';
import { EmptyDiv24h, Title, TitleDiv } from '@/styles/Common.styled';
import useFetchFromUrl from '@/hook/useFetchFromUrl';
const themeUrl = 'http://localhost:3000/api/themes'



const GiftThemeList = () => {
  const { item, loding, error } = useFetchFromUrl(themeUrl);


  if (error) return null

  if (loding) return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  )

  return (
    <ThemeGrid>
      {item.map(({ themeId, name, image }) => (

        <ThemeItem key={themeId} >
          <ThemeImage src={image} alt={name} />
          <ThemeLabel>{name}</ThemeLabel>
        </ThemeItem>
      ))}
    </ThemeGrid>
  )
}


const GiftTheme = () => {


  return (
    <GiftThemeSection>
      <EmptyDiv24h />
      <TitleDiv><Title>선물 테마</Title></TitleDiv>
      <GiftThemeList />
      <EmptyDiv24h />
    </GiftThemeSection>
  );
};

export default GiftTheme;
