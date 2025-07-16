import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import CategoryItem from './CategoryItem';
import Spinner from './common/Spinner';
import type { GiftThemeType } from '@/types/theme';

const Wrapper = styled.section`
  margin-top: ${({ theme }) => theme.spacing.spacing6};
  margin-bottom: ${({ theme }) => theme.spacing.spacing6};
  padding: ${({ theme }) => theme.spacing.spacing2};
`;

const Title = styled.h2`
  ${({ theme }) => theme.typography.title1Bold};
  padding: 0 8px 20px;
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing5} ${({ theme }) => theme.spacing.spacing1};
  cursor: pointer;
`;

const Loading = styled.p`
  padding: 0 8px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function GiftTheme() {
  const [themes, setThemes] = useState<GiftThemeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await fetch('/api/themes');
        if (!res.ok) throw new Error('fetch 실패');

        const data = await res.json();

        // 테스트용 딜레이
        await new Promise((r) => setTimeout(r, 300));

        setThemes(data.data || []);
      } catch (err) {
        console.error('테마 불러오기 에러:', err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemes();
  }, []);

  if (isLoading) {
    return (
      <Wrapper>
        <Title>선물 테마</Title>
        <Loading>
          <Spinner />
        </Loading>
      </Wrapper>
    );
  }

  if (hasError || themes.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      <Title>선물 테마</Title>
      <Grid>
        {themes.map(({ themeId, name, image }) => (
          <CategoryItem key={themeId} name={name} image={image} />
        ))}
      </Grid>
    </Wrapper>
  );
}
