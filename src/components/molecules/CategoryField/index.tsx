import { CategoryItemCard } from '@/components';
import * as S from './styles';
import { getThemes } from '@/lib/api';
import { useState, useEffect } from 'react';
import { type Theme } from '@/types/api';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

const CategoryField = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [fetchState, setFetchState] = useState<FetchState<Theme[]>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    getThemes()
    .then((data) => {
      setThemes(data);
      setFetchState({
        isLoading: false,
        isError: false,
        data,
      });
    })
  }, []);

  if (fetchState.isLoading) {
    return <div>Loading...</div>;
  }
  if (fetchState.isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <S.Container>
      <S.Title>선물 테마</S.Title>
      <S.Grid>
        {themes.map((theme) => (
          <CategoryItemCard
            key={theme.themeId}
            imageUrl={theme.image}
            title={theme.name}
          />
        ))}
      </S.Grid>
    </S.Container>
  );
};

export default CategoryField; 