import { useState } from 'react';

type FilterKey = 'all' | 'female' | 'male' | 'teen';
type TabOption = '받고 싶어한' | '많이 선물한' | '위시로 받은';

const filters: FilterKey[] = ['all', 'female', 'male', 'teen'];
const tabs: TabOption[] = [
  '받고 싶어한',
  '많이 선물한',
  '위시로 받은',
];

const LOCAL_FILTER_KEY = 'gift_filter_selected';
const LOCAL_TAB_KEY = 'gift_tab_selected';

export const useGiftRankingFilter = () => {
  const getStoredValue = <T extends string>(
    key: string,
    validValues: T[],
    defaultValue: T
  ): T => {
    const stored = localStorage.getItem(key);
    return validValues.includes(stored as T)
      ? (stored as T)
      : defaultValue;
  };

  const [selectedFilter] = useState<FilterKey>(() =>
    getStoredValue(LOCAL_FILTER_KEY, filters, 'all')
  );

  const [selectedTab] = useState<TabOption>(() =>
    getStoredValue(LOCAL_TAB_KEY, tabs, '받고 싶어한')
  );

  return {
    selectedFilter,
    selectedTab,
  };
};
