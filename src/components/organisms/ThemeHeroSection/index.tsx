import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getThemeInfo } from '@/lib/api/themes';
import type { ThemeInfo } from '@/types/api';
import { useFetchState } from '@/hooks/useFetchState';
import { useErrorHandler } from '@/utils/errorHandler';
import { Loading, ErrorMessage } from '@/components';
import * as S from './styles';

interface ThemeHeroSectionProps {
  themeId?: number;
}

const ThemeHeroSection = ({ themeId }: ThemeHeroSectionProps) => {
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();
  const { fetchState, setLoading, setSuccess, setError, reset } = useFetchState<ThemeInfo | null>(null);

  useEffect(() => {
    if (!themeId) {
      reset();
      return;
    }

    const fetchThemeInfo = async () => {
      setLoading(true);
      try {
        const themeInfo = await getThemeInfo(themeId);
        setSuccess(themeInfo);
      } catch (error) {
        handleError(error, {
          404: () => {
            navigate('/');
          }
        });    
        setError();
      }
    };

    fetchThemeInfo();
  }, [themeId, setLoading, setSuccess, setError, reset, handleError, navigate]);

  return (
    <>
      {fetchState.isLoading && (
        <S.ThemeHeroContainer>
          <Loading height="80px" message="테마 정보를 불러오는 중..." />
        </S.ThemeHeroContainer>
      )}

      {fetchState.isError && (
        <S.ThemeHeroContainer>
          <ErrorMessage height="80px" />
        </S.ThemeHeroContainer>
      )}

      {!fetchState.isLoading && !fetchState.isError && fetchState.data && (
        <S.ThemeHeroContainer backgroundColor={fetchState.data.backgroundColor}>    
          <S.ThemeName>{fetchState.data.name}</S.ThemeName>
          <S.ThemeTitle>{fetchState.data.title}</S.ThemeTitle>
          <S.ThemeDescription>{fetchState.data.description}</S.ThemeDescription>
        </S.ThemeHeroContainer>
      )}
    </>
  );
};

export default ThemeHeroSection;
