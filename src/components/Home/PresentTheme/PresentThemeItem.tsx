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

interface Theme {
  themeId: number;
  name: string;
  image: string;
}

interface Themes {
  data: Theme[];
}
const PresentThemeItem = () => {
  const [themes, setThemes] = useState<Themes>({
    data: [
      {
        themeId: 2920,
        name: '생일',
        image:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    ],
  });

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        // const response = await axios.get(process.env.VITE_API_BASE_URL + '/themes');
        const response = await axios.get('http://localhost:3000/api/themes');
        setThemes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchThemes();
  }, []);
  console.log(themes);
  return (
    <>
      {themes &&
        themes.data.map((item: Theme) => (
          <StyledPresentThemeItemDiv key={item.themeId} className='border'>
            <StyledImage src={item.image} alt={item.name} />
            <StyledP>{item.name}</StyledP>
          </StyledPresentThemeItemDiv>
        ))}
    </>
  );
};

export default PresentThemeItem;
