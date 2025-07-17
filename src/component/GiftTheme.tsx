import { GiftCategory } from '@/mock/GiftCategory';
import { GiftThemeSection, ThemeGrid, ThemeImage, ThemeItem, ThemeLabel, Title } from './GiftTheme.styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
const url = import.meta.env.VITE_API_BASE_URL ;

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

  const [,setThemes] = useState([]);
  useEffect(() => {
    const fetchTheme = async () => {
      const data = await  getTheme (url);
      if (data) setThemes(data);
    };

    fetchTheme();
  }, [])

  return (
    <GiftThemeSection>
      <Title>선물 테마</Title>
      <ThemeGrid>
        {GiftCategory.map(({ themeId, name, image }) => (
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
