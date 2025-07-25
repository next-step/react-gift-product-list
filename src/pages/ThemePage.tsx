import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Layout } from '@/components/Layout';
import { NavBar } from '@/components/NavBar';
import { ThemeHeader } from '@/components/ThemeHeader';
import { RankingGrid } from '@/components/RankingGrid';
import { RankingGridSkeleton } from '@/components/RankingGridSkeleton';
import { useFetch } from '@/hooks/useFetch';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { getThemeInfo, getThemeProducts } from '@/api/services';
import type { GiftItem } from '@/types';
import { css } from '@emotion/react';

const centeredMessage = css`
  text-align: center;
  padding: 50px;
  color: #868b94;
`;

const ThemePage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();

  const { data: themeInfo, error: themeInfoError, isLoading: isThemeInfoLoading } = useFetch(
    () => getThemeInfo(themeId!),
    [themeId],
    { enabled: !!themeId }
  );

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isFetchingNextPage,
    error: productsError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['themeProducts', themeId],
    queryFn: ({ pageParam }) => getThemeProducts(themeId!, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.hasMoreList ? lastPage.cursor : undefined,
    enabled: !!themeId,
  });

  const { targetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const allProducts = productsData?.pages.flatMap(page => page.list) || [];

  useEffect(() => {
    if (axios.isAxiosError(themeInfoError) && themeInfoError.response?.status === 404) {
      alert('존재하지 않는 테마입니다.');
      navigate('/');
    }
  }, [themeInfoError, navigate]);

  const handleCardClick = (item: GiftItem) => {
    navigate(`/order/${item.id}`);
  };

  if (isThemeInfoLoading) {
    return (
      <Layout>
        <NavBar />
        <div css={centeredMessage}>로딩 중...</div>
      </Layout>
    );
  }

  if (themeInfoError || !themeInfo) {
    return (
      <Layout>
        <NavBar />
        <div css={centeredMessage}>테마 정보를 불러오는 데 실패했습니다.</div>
      </Layout>
    );
  }

  const renderProductContent = () => {
    if (isProductsLoading && allProducts.length === 0) {
      return <RankingGridSkeleton />;
    }
    if (productsError) {
      return <div css={centeredMessage}>상품 목록을 불러오는 데 실패했습니다.</div>;
    }
    if (allProducts.length === 0) {
      return <div css={centeredMessage}>상품이 없습니다.</div>;
    }
    return <RankingGrid items={allProducts} onCardClick={handleCardClick} />;
  };

  return (
    <Layout>
      <NavBar />
      <ThemeHeader
        name={themeInfo.name}
        title={themeInfo.title}
        description={themeInfo.description}
        backgroundColor={themeInfo.backgroundColor}
      />
      {renderProductContent()}

      {isFetchingNextPage && <RankingGridSkeleton />}

      {hasNextPage && !isProductsLoading && <div ref={targetRef} style={{ height: '50px' }} />}
    </Layout>
  );
};

export default ThemePage;
