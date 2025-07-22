import styled from '@emotion/styled';
import { useApi } from '@/hooks/useApi';
import { fetchThemes } from '@/api/themesApi';
import { FadeLoader } from 'react-spinners';
import { Grid, Item, ImageStyle } from '@/components/category/GiftCategoryGrid';
import { Wrapper, Title } from '@/components/category/GiftCategory.style';
import { useNavigate } from 'react-router-dom';
interface Theme {
  themeId: number;
  name: string;
  image: string;
}

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GiftCategoryList = () => {
  const navigate = useNavigate();
  const { data: themes, isLoading, hasError } = useApi<Theme[]>(fetchThemes);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <FadeLoader color="#033128" height={15} width={5} />
      </LoadingWrapper>
    );
  }

  if (hasError || !themes || themes.length === 0) return null;

  return (
    <Wrapper>
      <Title>선물 테마</Title>
      <Grid>
        {themes.map((item) => (
          <Item
            key={item.themeId}
            onClick={() => {
              navigate(`/theme/${item.themeId}`);
            }}
            style={{ cursor: 'pointer' }}
          >
            <ImageStyle src={item.image} alt={item.name} />
            <span>{item.name}</span>
          </Item>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default GiftCategoryList;
