import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Box = styled.div`
  background-color: white;
  height: 350px;
`;

const List = styled.ul`
  display: flex;
  gap: 17px;

  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;

  font-weight: bold;
  font-size: 20px;

  margin: 20px 10px;
  padding: 10px 0px 0px 10px;
`;

const Item = styled.li`
  width: calc(16% - 17px);
  text-align: center;

  cursor: pointer;

  margin: 5px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
`;

const Name = styled.div`
  font-size: 12px;
`;

type Theme = {
  themeId: number;
  name: string;
  image: string;
};

function CategoryList() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${import.meta.env.VITE_API_URL}/api/themes`)
      .then((res) => {
        if (!res.ok) throw new Error('서버 에러');
        return res.json();
      })
      .then((data) => {
        // 항상 배열로 세팅
        if (Array.isArray(data)) {
          setThemes(data);
        } else {
          setThemes([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('데이터를 불러오지 못했습니다.');
        setLoading(false);
      });
  }, []);
  return (
    <Box>
      <Title>선물 테마</Title>
      {loading ? (
        <div>로딩 중 ... </div>
      ) : error ? (
        <div>{error}</div>
      ) : themes.length === 0 ? (
        <div>테마가 없습니다.</div>
      ) : (
        <List>
          {themes.map((cat) => (
            <Item key={cat.themeId}>
              <Img src={cat.image} alt={cat.name} />
              <Name>{cat.name}</Name>
            </Item>
          ))}
        </List>
      )}
    </Box>
  );
}

export default CategoryList;
