import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

const StyledImage = styled.img`
  padding: ${({ theme }) => theme.spacing.spacing2};
  width: 50px;
  height: 50px;
`;
const StyledP = styled.p`
  ${({ theme }) => theme.typography.label2Regular}
  margin: 3px;
`;
const StyledPresentThemeItemDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.spacing2};
`;
const StyledPresentP = styled.p`
  ${({ theme }) => theme.typography.title1Bold};
  margin: ${({ theme }) => theme.spacing.spacing3};
`;
const StyledPresentThemeDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: ${({ theme }) => theme.sementicPalette.backgroundDefault};
  width: 720px;
`;
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
        const response = await axios.get('http://localhost:3000/api/themes');
        setThemes(response.data);
      } catch (error) {
        console.error('Error fetching Theme data:', error);
        setError(true);
      }
    };
    fetchThemes();
    setLoading(false);
  }, [isLoading, isError]);

  if (isLoading) {
    return <div>Loading</div>;
  } else if (isError || themes.data.length <= 0) {
    return <>{alert('에러 발생')}</>;
  } else {
    return (
      <>
        <StyledPresentP>선물 테마</StyledPresentP>
        <StyledPresentThemeDiv>
          {themes &&
            themes.data.map((item: Theme) => (
              <StyledPresentThemeItemDiv key={item.themeId} className='border'>
                <StyledImage src={item.image} alt={item.name} />
                <StyledP>{item.name}</StyledP>
              </StyledPresentThemeItemDiv>
            ))}
        </StyledPresentThemeDiv>
      </>
    );
  }
};

export default PresentThemeItem;
