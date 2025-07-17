import { useEffect, useState } from 'react';
import {
  StyledImage,
  StyledPresentThemeDiv,
  StyledPresentThemeItemDiv,
  StyledPresentThemeItemP,
} from '@styles/Home/PresentTheme/StyledPresnetThemeItem';
import { StyledPresentThemeCommonP } from '@src/styles/Home/StyledPresentThemeCommonP';
import { ApiClient } from '@src/api/FetchData';

interface Theme {
  themeId: number;
  name: string;
  image: string;
}

interface Themes {
  data: Theme[];
}
const PresentThemeItem = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [themes, setThemes] = useState<Themes>({
    data: [
      {
        themeId: 0,
        name: '',
        image: 'none',
      },
    ],
  });

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        // const response = await axios.get(process.env.VITE_API_BASE_URL + '/themes');
        const data = await ApiClient('GET', 'themes', null);
        setThemes(data);
        setError(false);
      } catch (error) {
        console.error('Error fetching Theme data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchThemes();
  }, [isLoading, isError]);

  if (isLoading) {
    return <div>Loading</div>;
  } else if (isError || themes.data.length <= 0) {
    return <>{alert('에러 발생')}</>;
  } else {
    return (
      <>
        <StyledPresentThemeCommonP>선물 테마</StyledPresentThemeCommonP>
        <StyledPresentThemeDiv>
          {themes &&
            themes.data.map((item: Theme) => (
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
