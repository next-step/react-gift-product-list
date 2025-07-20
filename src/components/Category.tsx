import styled from "@emotion/styled";
import { useFetch } from "@/hooks/useFetch";
import { API } from "@/constants/api";
import { useNavigate } from "react-router-dom";

type Theme = {
  themeId: number;
  name: string;
  image: string;
};

export default function Category() {
  const { data, loading, error } = useFetch<Theme[]>(API.THEMES);
  const categories = data ?? []; // data가 null인 경우 방지

  if (loading) return <div>로딩 중...</div>;
  if (error || categories.length === 0) return null; // 데이터 없거나 에러면 렌더링 안함

  return (
    <>
      <Block />
      <Section>
        <Title>선물 테마</Title>
        <Grid>
          {categories.map((item) => (
            <CategoryCard
              key={item.themeId}
              themeId={item.themeId}
              image={item.image}
              name={item.name}
            />
          ))}
        </Grid>
      </Section>
      <Block />
    </>
  );
}

function CategoryCard({
  themeId,
  image,
  name,
}: {
  themeId: number;
  image: string;
  name: string;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/themes/${themeId}`);
  };

  return (
    <CategoryItem onClick={handleClick}>
      <Image src={image} alt={name} />
      <Label>{name}</Label>
    </CategoryItem>
  );
}

const Block = styled.section`
  width: 100%;
  height: 24px;
  background-color: transparent;
`;

const Section = styled.section`
  padding: 8px 0;
`;

const Title = styled.h2`
  ${({ theme }) => theme.typography.title1Bold};
  padding: 0px 8px 20px;
  margin: 0px;
  width: 100px;
  text-align: left;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 4px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(4, 1fr); // 모바일은 4개씩
  }
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
`;

const Image = styled.img`
  max-width: 50px;
  max-height: 50px;
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
  overflow: hidden;
`;

const Label = styled.span`
  ${({ theme }) => theme.typography.label2Regular};
  margin: 0px;
  text-align: left;
`;
