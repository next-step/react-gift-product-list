import styled from '@emotion/styled';
import categories from '../../mocks/category.mock';
import PromoBanner from './PromoBanner';

import { useEffect, useState } from 'react';
import axios from 'axios';

const GiftCategorySelectorWrapper = styled.div`
  width: auto;
  height: auto;
  padding: ${({ theme }) => theme.spacing.spacing8} ${({ theme }) => theme.spacing.spacing4};
`;

const GiftCategorySelectorTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title.title1Bold.lineHeight};
`;

const GiGiftCategorySelectorItemBoxWrapper = styled.div`
  width: 100%;
  height: 300px;
  display:flex;
  justify-content: center;
  align-items: center;
`
const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const GiftCategorySelectorItemBoxGrid = styled.div`
  width: auto;
  height: auto;
  margin-top: ${({ theme }) => theme.spacing.spacing5};
  margin-bottom: ${({ theme }) => theme.spacing.spacing10};
  
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: ${({ theme }) => theme.spacing.spacing5};
  column-gap: ${({ theme }) => theme.spacing.spacing16};
`;

const GiftCategorySelectorItemWrapper = styled.div`
  width: auto;
  height: auto;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GiftCategorySelectorItemImg = styled.img`
  width: ${({ theme }) => theme.spacing.spacing13};
  height: ${({ theme }) => theme.spacing.spacing13};
  border-radius: ${({ theme }) => theme.spacing.spacing4};
`;

const GiftCategorySelectorItemText = styled.p`
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.spacing1};
`;


function GiftCategorySelectorItemBox() {
  const [themes, setThemes] = useState([]);
  const [isLoding, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/themes');
        setThemes(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchThemes();
  }, []);

  // console.log(themes);
  return (
    <GiGiftCategorySelectorItemBoxWrapper>
      {!isError && (isLoding ? <Spinner/> : <GiftCategorySelectorItemBoxGrid>
                {themes.map((item) => (
                  <GiftCategorySelectorItemWrapper key={item.themeId}>
                    <GiftCategorySelectorItemImg
                      src={item.image}
                      alt={item.name}
                    ></GiftCategorySelectorItemImg>
                    <GiftCategorySelectorItemText>
                      {item.name}
                    </GiftCategorySelectorItemText>
                  </GiftCategorySelectorItemWrapper>))}
      </GiftCategorySelectorItemBoxGrid>)}
    </GiGiftCategorySelectorItemBoxWrapper>
  );
}

function GiftCategorySelector() {


  return (
    <GiftCategorySelectorWrapper>
      <GiftCategorySelectorTitle>선물 테마</GiftCategorySelectorTitle>
      <GiftCategorySelectorItemBox></GiftCategorySelectorItemBox>
      <PromoBanner></PromoBanner>
    </GiftCategorySelectorWrapper>
  );
}

export default GiftCategorySelector;
