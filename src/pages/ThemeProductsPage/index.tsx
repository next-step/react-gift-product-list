import { useParams } from 'react-router-dom';
import { useGetThemeInfo } from './useGetThemeInfo';
import * as S from './styles';

const ThemeProductsPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const { themeInfo, error } = useGetThemeInfo(Number(themeId));

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!themeInfo) {
    return <div>Theme not found</div>;
  }

  return (
    <S.ThemeInfoBanner backgroundColor={themeInfo.backgroundColor}>
      <S.Theme>{themeInfo.name}</S.Theme>
      <S.Title>{themeInfo.title}</S.Title>
      <S.Description>{themeInfo.description}</S.Description>
    </S.ThemeInfoBanner>
  );
};

export default ThemeProductsPage;
