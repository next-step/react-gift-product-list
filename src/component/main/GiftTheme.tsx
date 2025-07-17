import { GiftThemeSection, ThemeGrid, ThemeImage, ThemeItem, ThemeLabel } from './GiftTheme.styled';
import { EmptyDiv24h, Spinner, SpinnerWrapper, Title, TitleDiv } from '@/styles/CommomStyle/Common.styled';
import { useNavigate } from 'react-router-dom';
import useFetchFromUrlT from '@/hook/useFetchFromUrlT';
const themeUrl = 'http://localhost:3000/api/themes'



const GiftThemeList = () => {
  const { item, loding, error } = useFetchFromUrlT<[]>(themeUrl, []);
  const navigate = useNavigate();

  if (error) return null

  if (loding) return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  )

  return (
    <ThemeGrid>
      {item.map(({ themeId, name, image }) => (

        <ThemeItem key={themeId} onClick={() => navigate(`Themes/${themeId}`)}>
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
