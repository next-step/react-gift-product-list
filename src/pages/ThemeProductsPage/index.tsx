import { useParams } from 'react-router-dom';
import * as S from './styles';
import ThemeProductList from './ThemeProductList';
import { useGetThemeInfo } from './useGetThemeInfo';
import { useCallback, useRef } from 'react';
import { useGetThemeProducts } from './useGetThemeProducts';

const ThemeProductsPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const id = Number(themeId);
  const { themeInfo, error: themeError } = useGetThemeInfo(id);
  const {
    list: products,
    isLoading,
    error: productsError,
    hasMore,
    loadMore,
  } = useGetThemeProducts(id, 10);

  const observer = useRef<IntersectionObserver | null>(null);
  const bottomRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      observer.current?.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, loadMore],
  );

  if (themeError || productsError) {
    return <div>Error: {(themeError || productsError)?.message}</div>;
  }
  if (!themeInfo) {
    return <div>Loading theme…</div>;
  }

  return (
    <S.Frame>
      <S.ThemeInfoBanner backgroundColor={themeInfo.backgroundColor}>
        <S.Theme>{themeInfo.name}</S.Theme>
        <S.Title>{themeInfo.title}</S.Title>
        <S.Description>{themeInfo.description}</S.Description>
      </S.ThemeInfoBanner>

      <ThemeProductList products={products} />

      {!isLoading && products.length === 0 && <S.Noitem>상품이 없습니다.</S.Noitem>}

      {hasMore && <div ref={bottomRef} style={{ height: 1 }} />}
    </S.Frame>
  );
};

export default ThemeProductsPage;
