import { useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, spacing } from '@/styles/tokens';
import { Header } from '@/components/Header/Header';
import { useParams, useNavigate } from 'react-router';
import { useFetchThemeInfo } from '@/api/fetchThemeInfo';
import { typography } from '@/styles/tokens';
import { Loading } from '@/components/common/Loading';

const AppContainer = styled.div`
  max-width: 720px;
  margin: 0 auto;
  background-color: ${colors.gray50};
  min-height: 100vh;
`;

const ThemeInfoContainer = styled.div<{ backgroundColor: string }>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  padding: ${spacing.lg};
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 120px;
`;
const ThemeInfoName = styled.div`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.white};
`;

const ThemeInfoTitle = styled.div`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.white};
`;

const ThemeInfoDescription = styled.div`
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.regular};
  color: ${colors.white};
`;

export const ThemeProductListPage = () => {
  const { themeId } = useParams();
  const navigate = useNavigate();
  const { themeInfo, loading, error, is404Error } = useFetchThemeInfo(themeId || '');

  // 404 에러 처리
  useEffect(() => {
    if (is404Error) {
      navigate('/');
    }
  }, [is404Error, navigate]);

  return (
    <AppContainer>
      <Header title="선물하기" />
      {loading ? (
        <Loading />
      ) : error ? (
        <div>테마 정보 불러오기 실패</div>
      ) : (
        <ThemeInfoContainer backgroundColor={themeInfo?.backgroundColor || ''}>
          <ThemeInfoName>{themeInfo?.name}</ThemeInfoName>
          <ThemeInfoTitle>{themeInfo?.title}</ThemeInfoTitle>
          <ThemeInfoDescription>{themeInfo?.description}</ThemeInfoDescription>
        </ThemeInfoContainer>
      )}
    </AppContainer>
  );
};
