import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { fetchThemes } from '@/api/themesApi';
import { FadeLoader } from 'react-spinners';
import { Grid, Item, ImageStyle } from '@/components/category/GiftCategoryGrid';
import { Wrapper, Title } from '@/components/category/GiftCategory.style';

interface Theme {
  themeId: number;
  name: string;
  image: string;
}

const LodingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GiftCategoryList = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getThemes = async () => {
      try {
        const response = await fetchThemes();
        setThemes(response.data.data);
      } catch (error) {
        console.error('테마 데이터 가져오기 실패:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getThemes();
  }, []);

  if (isLoading)
    return (
      <LodingWrapper>
        <FadeLoader
          color="#033128"
          height={15}
          width={5}
        />
      </LodingWrapper>
    );

  if (hasError || themes.length === 0) return null;

  return (
    <Wrapper>
      <Title>선물 테마</Title>
      <Grid>
        {themes.map((item) => (
          <Item key={item.themeId}>
            <ImageStyle src={item.image} alt={item.name} />
            <span>{item.name}</span>
          </Item>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default GiftCategoryList;
