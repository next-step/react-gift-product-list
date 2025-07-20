import { useParams } from 'react-router-dom';
import { useGetThemeInfo } from './useGetThemeInfo';
import { useGetThemeProducts } from './useGetThemeProducts';
import * as S from './styles';
import ThemeProductList from './ThemeProductList';

const ThemeProductsPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const { themeInfo, error: themeError } = useGetThemeInfo(Number(themeId));
  const { products, isLoading, error: productsError } = useGetThemeProducts(Number(themeId));

  if (themeError || productsError) {
    return <div>Error: {themeError?.message || productsError?.message}</div>;
  }

  if (isLoading || !themeInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <S.ThemeInfoBanner backgroundColor={themeInfo.backgroundColor}>
        <S.Theme>{themeInfo.name}</S.Theme>
        <S.Title>{themeInfo.title}</S.Title>
        <S.Description>{themeInfo.description}</S.Description>
      </S.ThemeInfoBanner>
      <ThemeProductList products={products} />
    </>
  );
};

export default ThemeProductsPage;
