import { GiftCategory } from '@/mock/GiftCategory';
import { GiftThemeSection, ThemeGrid, ThemeImage, ThemeItem, ThemeLabel, Title } from './GiftTheme.styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
const baseUrl = import.meta.env.VITE_API_BASE_URL ;
const themeUrl = 'http://localhost:3000/api/themes'

async function getTheme(url : string) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


const GiftTheme = () => {

  const [Themes,setThemes] = useState([]);
  useEffect(() => {
    const fetchTheme = async () => {
      const theme = await  getTheme (themeUrl);
      if (theme) setThemes(theme.data);
    };

    fetchTheme();
  }, [])

  return (
    <GiftThemeSection>
      <Title>선물 테마</Title>
      <ThemeGrid>
        {Themes.map(({ themeId, name, image}) => (
          <ThemeItem key={themeId} >
            <ThemeImage src={image} alt={name} />
            <ThemeLabel>{name}</ThemeLabel>
          </ThemeItem>
        ))}
      </ThemeGrid>
    </GiftThemeSection>
  );
};

export default GiftTheme;
