import { CategoryItemCard } from '@/components';
import * as S from './styles';
import { getThemes } from '@/lib/api';
import { useEffect } from 'react';
import { type Theme } from '@/types/api';
import { useFetchState } from '@/hooks/useFetchState';

const CategoryField = () => {
  const { fetchState, setLoading, setSuccess, setError } = useFetchState<Theme[]>(true);
  
  useEffect(() => {
    setLoading();
    
    getThemes()
      .then((data) => {
        setSuccess(data);
      })
      .catch(() => {
        setError();
      });
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
        {fetchState.data?.map((theme) => (
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