import { CategoryItemCard } from '@/components';
import * as S from './styles';
import { getThemes } from '@/lib/api';
import { useEffect } from 'react';
import { type Theme } from '@/types/api';
import { useFetchState } from '@/hooks/useFetchState';
import { Loading, ErrorMessage } from '@/components';

const CategoryField = () => {
  const { fetchState, setLoading, setSuccess, setError } = useFetchState<Theme[]>([], true);
  
  useEffect(() => {
    const fetchThemes = async () => {
      setLoading(true);
      try {
        const data = await getThemes();
        setSuccess(data);
      } catch {
        setError();
      } finally {
        setLoading(false);
      }
    };
    
    fetchThemes();
  }, []);

  return (
    <S.Container>
      <S.Title>선물 테마</S.Title>
      {fetchState.isLoading ? (
        <Loading height="200px" />  
      ) : fetchState.isError ? (
        <ErrorMessage height="200px" />
      ) : (
        <S.Grid>
          {fetchState.data.map((theme) => (
            <CategoryItemCard
              key={theme.themeId}
              themeId={theme.themeId}
              imageUrl={theme.image}
              title={theme.name}
            />
          ))}
        </S.Grid>
      )}
    </S.Container>
  );
};

export default CategoryField; 