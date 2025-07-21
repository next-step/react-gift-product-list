import styled from "@emotion/styled";
import Loading from "@/components/common/Loading";
import useFetch from "@/hooks/useFetch";
import type { CategoryType } from "@/types/CategoryType";
import { generatePath, Link } from "react-router-dom";
import { ROUTE_PATH } from "@/components/routes/routePath";
import API_ENDPOINTS from "@/constants/apiEndpoints";

const Category = () => {
  const themes = useFetch<CategoryType[]>(API_ENDPOINTS.THEMES);

  if (themes.isLoading) {
    return (
      <Container>
        <Title>선물 테마</Title>
        <Loading height="250px" />
      </Container>
    );
  }

  if (themes.error || themes.data?.length === 0) {
    return null;
  }

  return (
    <Container>
      <Title>선물 테마</Title>
      <List>
        {themes.data?.map((category) => (
          <Item key={category.themeId} to={generatePath(ROUTE_PATH.THEMES, { themeId: String(category.themeId) })}>
            <Img src={category.image} alt={category.name} />
            <Name>{category.name}</Name>
          </Item>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.spacing1};
  background-color: ${({ theme }) => theme.color.backgroundColor.default};
`;
const Title = styled.div`
  padding-left: ${({ theme }) => theme.spacing.spacing2};
  padding-top: 0;
  padding-right: ${({ theme }) => theme.spacing.spacing2};
  padding-bottom: ${({ theme }) => theme.spacing.spacing5};
  margin-right: auto;
  font: ${({ theme }) => theme.typography.title1Bold};
`;
const List = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing5} ${({ theme }) => theme.spacing.spacing2};
`;
const Item = styled(Link)`
  width: 100%;
  height: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  text-decoration: none;
`;
const Img = styled.img`
  max-width: 3.125rem;
  max-height: 3.125rem;
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
  overflow: hidden;
`;
const Name = styled.p`
  font: ${({ theme }) => theme.typography.label2Regular};
  color: ${({ theme }) => theme.color.textColor.default};
`;

export default Category;
