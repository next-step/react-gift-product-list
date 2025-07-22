import { useState } from 'react';

type FilterKey = 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
type TabOption = '받고 싶어한' | '많이 선물한' | '위시로 받은';

const filters: FilterKey[] = ['ALL', 'FEMALE', 'MALE', 'TEEN'];
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

  const [selectedFilter, setSelectedFilter] = useState<FilterKey>(
    () => getStoredValue(LOCAL_FILTER_KEY, filters, 'ALL')
  );

  const [selectedTab, setSelectedTab] = useState<TabOption>(() =>
    getStoredValue(LOCAL_TAB_KEY, tabs, '받고 싶어한')
  );

  const updateFilter = (filter: FilterKey) => {
    setSelectedFilter(filter);
    localStorage.setItem(LOCAL_FILTER_KEY, filter);
  };

  const updateTab = (tab: TabOption) => {
    setSelectedTab(tab);
    localStorage.setItem(LOCAL_TAB_KEY, tab);
  };

  return {
    selectedFilter,
    selectedTab,
    setSelectedFilter: updateFilter,
    setSelectedTab: updateTab,
    filters,
    tabs,
  };
};
