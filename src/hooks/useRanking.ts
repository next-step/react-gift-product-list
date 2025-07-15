import { useState } from 'react';
import { SEX_TYPE } from '@/types/sex';
import type { SexType } from '@/types/sex';
import type { CategoryType } from '@/types/category';
import { CATEGORY_TYPE } from '@/types/category';

function useRanking() {
  function getInitialSex(): SexType {
    const saved = localStorage.getItem('selectedSex');
    if (saved && Object.values(SEX_TYPE).includes(saved as SexType)) return saved as SexType;
    return SEX_TYPE.ALL;
  }
  const [selectedSex, setSelectedSex] = useState<SexType>(getInitialSex);
  function handleSelect(sex: SexType) {
    setSelectedSex(sex);
    localStorage.setItem('selectedSex', sex);
  }

  function getInitialCategory(): CategoryType {
    const category = localStorage.getItem('selectedCategory');
    if (category && Object.values(CATEGORY_TYPE).includes(category as CategoryType)) {
      return category as CategoryType;
    }
    return CATEGORY_TYPE.MANY_WISH;
  }
  const [selectCategory, setSelectCategory] = useState<CategoryType>(getInitialCategory);
  function handleCategoryClick(category: CategoryType) {
    setSelectCategory(category);
    localStorage.setItem('selectedCategory', category);
  }

  return {
    selectedSex,
    selectCategory,
    setSelectedSex,
    handleSelect,
    handleCategoryClick,
  };
}

export default useRanking;
