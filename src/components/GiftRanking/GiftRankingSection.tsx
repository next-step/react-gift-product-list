import { useState } from 'react';
import { Section, Heading, None } from '@/components/GiftRanking/GiftRanking.styles';
import { GiftRankingFilter } from '@/components/GiftRanking/GiftRankingFilter';
import GiftRankingGrid from '@/components/GiftRanking/GiftRankingGrid';
import useGetRanking from './useGetRanking';
import { CATEGORY_OPTIONS, SORT_OPTIONS } from './constants';
import type { CategoryValue, SortValue } from './constants';

const GiftRankingSection = () => {
  const getInitialCategory = (): CategoryValue => {
    const stored = localStorage.getItem('selectedCategory');
    return (
      (CATEGORY_OPTIONS.find((option) => option.value === stored)?.value || 'ALL')
    );
  };

  const getInitialSort = (): SortValue => {
    const stored = localStorage.getItem('selectedSort');
    return SORT_OPTIONS.find((option) => option.value === stored)?.value || 'MANY_WISH';
  };

  const [selectedCategory, setSelectedCategory] = useState<CategoryValue>(getInitialCategory);
  const [selectedSort, setSelectedSort] = useState<SortValue>(getInitialSort);

  const { products, isLoading, error } = useGetRanking(selectedCategory, selectedSort);

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
