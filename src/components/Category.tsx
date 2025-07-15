import styled from '@emotion/styled'
import { useEffect, useState } from "react";
import axios from "axios";

type Theme = {
  themeId: number;
  name: string;
  image: string;
};

export default function Category() {
  const [categories, setCategories] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get<{ data: Theme[]}>("http://localhost:3000/api/themes")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch(() => {
        setError(true);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

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
              image={item.image}
              name={item.name}
            />
          ))}
        </Grid>
      </Section>
      <Block />
    </>
  )
}

function CategoryCard({ image, name }: { image: string; name: string }) {
  return (
    <CategoryItem>
      <Image src={image} alt={name} />
      <Label>{name}</Label>
    </CategoryItem>
  )
}

const Block = styled.section`
  width: 100%;
  height: 24px;
  background-color: transparent;
`

const Section = styled.section`
  padding: 8px 0;
`

const Title = styled.h2`
  ${({ theme }) => theme.typography.title1Bold};
  padding: 0px 8px 20px;
  margin: 0px;
  width: 100px;
  text-align: left;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 4px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(4, 1fr); // 모바일은 4개씩
  }
`

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
`

const Image = styled.img`
  max-width: 50px;
  max-height: 50px;
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
  overflow: hidden;
`

const Label = styled.span`
  ${({ theme }) => theme.typography.label2Regular};
  margin: 0px;
  text-align: left;
`