import { useState } from 'react';
import axios from 'axios';
import { SEX_TYPE } from '@/types/sex';
import type { SexType } from '@/types/sex';
import type { CategoryType } from '@/types/category';
import { CATEGORY_TYPE } from '@/types/category';
import { getRanking } from '@/apis/product';
import type { RankItemType } from '@/types/DTO/productDTO';

function useRanking() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  function getInitialSex(): SexType {
    const saved = localStorage.getItem('selectedSex');
    if (saved && Object.values(SEX_TYPE).some((sex) => sex.value === saved))
      return saved as SexType;
    return SEX_TYPE[0].value;
  }
  const [selectedSex, setSelectedSex] = useState<SexType>(getInitialSex);
  function handleSelect(sex: SexType) {
    setSelectedSex(sex || 'ALL');
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
  const [items, setItems] = useState<RankItemType[]>([]);

  const getRank = async () => {
    try {
      const data = await getRanking({
        targetType: selectedSex,
        rankType: selectCategory,
      });
      console.log(data);
      setItems(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.data?.data?.status || '에러 발생';
        setError(status);
      } else {
        setError('알 수 없는 에러');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    selectedSex,
    selectCategory,
    items,
    setIsLoading,
    setError,
    setSelectedSex,
    setSelectCategory,
    handleSelect,
    handleCategoryClick,
    getRank,
  };
}

export default useRanking;
