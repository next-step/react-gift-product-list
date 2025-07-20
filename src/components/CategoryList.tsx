import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  width: 20%;
  text-align: center;

  cursor: pointer;

  margin: 5px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  margin-bottom: 3px;
`;

const Name = styled.div`
  font-size: 12px;
`;

type Theme = {
  themeId: number;
  name: string;
  image: string;
};

function CategoryList({ onHide }: { onHide?: () => void }) {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${import.meta.env.VITE_API_URL}/api/themes`)
      .then((res) => {
        if (!res.ok) throw new Error('서버 에러');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.data)) {
          setThemes(data.data);
          if (data.data.length === 0 && onHide) onHide();
        } else {
          setThemes([]);
          if (onHide) onHide();
        }
        setLoading(false);
      })
      .catch(() => {
        setError('데이터를 불러오지 못했습니다.');
        setLoading(false);
        if (onHide) onHide();
      });
  }, [onHide]);
  return (
    <Box>
      <Title>선물 테마</Title>
      {(() => {
        if (loading) {
          return <div>로딩 중 ... </div>;
        }
        if (error) {
          return <div>{error}</div>;
        }
        if (themes.length === 0) {
          return null;
        }
        return (
          <List>
            {themes.map((theme) => (
              <Item
                key={theme.themeId}
                onClick={() => {
                  navigate(`/themes/${theme.themeId}`);
                  if (onHide) onHide();
                }}
              >
                <Img src={theme.image} alt={theme.name} />
                <Name>{theme.name}</Name>
              </Item>
            ))}
          </List>
        );
      })()}
    </Box>
  );
}

export default CategoryList;
