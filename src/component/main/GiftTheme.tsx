import { getFromUrl } from '@/utils/getFromUrl';
import { GiftThemeSection, Spinner, SpinnerWrapper, ThemeGrid, ThemeImage, ThemeItem, ThemeLabel } from './GiftTheme.styled';
import { useEffect, useState } from 'react';
import { EmptyDiv24h, Title, TitleDiv } from '@/styles/Common.styled';
const themeUrl = 'http://localhost:3000/api/themes'



const GiftThemeList = () => {
  const [Themes, setThemes] = useState([]);
  const [Loding, setLoding] = useState(true);
  const [Error, setError] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      const theme = await getFromUrl(themeUrl);
      if (theme) {
        setThemes(theme.data);

      } else {
        setError(true);
      }
      setLoding(false);
    };

    fetchTheme();
  }, [])

  if (Error) return null

  if (Loding) return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  )

  return (
    <ThemeGrid>
      {Themes.map(({ themeId, name, image }) => (
        
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
      <EmptyDiv24h/>
      <TitleDiv><Title>선물 테마</Title></TitleDiv>
      <GiftThemeList />
      <EmptyDiv24h/>
    </GiftThemeSection>
  );
};

export default GiftTheme;
