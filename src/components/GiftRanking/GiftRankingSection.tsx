import { useState } from 'react';
import { Section, Heading, None } from '@/components/GiftRanking/GiftRanking.styles';
import { GiftRankingFilter, categoryTabs, sortTabs } from '@/components/GiftRanking/GiftRankingFilter';
import GiftRankingGrid from '@/components/GiftRanking/GiftRankingGrid';
import useGetRanking from './useGetRanking';

type Category = typeof categoryTabs[number];
type Sort = typeof sortTabs[number];

const GiftRankingSection = () => {
  const getInitialCategory = (): Category => {
    const stored = localStorage.getItem('selectedCategory');
    return categoryTabs.includes(stored as Category) ? (stored as Category) : '전체';
  };

  const getInitialSort = (): Sort => {
    const stored = localStorage.getItem('selectedSort');
    return sortTabs.includes(stored as Sort) ? (stored as Sort) : '많이 찜한';
  };

  const [selectedCategory, setSelectedCategory] = useState<Category>(getInitialCategory);
  const [selectedSort, setSelectedSort] = useState<Sort>(getInitialSort);

  const { products, isLoading, error } = useGetRanking(
    selectedCategory === '전체'
      ? 'ALL'
      : selectedCategory === '여성'
        ? 'FEMALE'
        : selectedCategory === '남성'
          ? 'MALE'
          : 'TEEN',
    selectedSort === '많이 찜한'
      ? 'MANY_WISH'
      : selectedSort === '많이 받은'
        ? 'MANY_RECEIVE'
        : 'MANY_WISH_RECEIVE'
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Section>
      <Heading>실시간 급상승 선물랭킹</Heading>
      <GiftRankingFilter
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
        onChangeCategory={(tab) => {
          setSelectedCategory(tab);
          localStorage.setItem('selectedCategory', tab);
        }}
        onChangeSort={(tab) => {
          setSelectedSort(tab);
          localStorage.setItem('selectedSort', tab);
        }}
      />
      {products.length === 0 && <None>'상품이 없습니다.'</None>}
      <GiftRankingGrid products={products} />
    </Section>
  );
};

export default GiftRankingSection;
