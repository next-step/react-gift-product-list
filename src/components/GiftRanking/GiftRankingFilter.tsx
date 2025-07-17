import {
  CategoryTab,
  TabCircle,
  TabRow,
  SortRow,
  SortTab,
} from '@/components/GiftRanking/GiftRanking.styles';
import {
  CATEGORY_OPTIONS,
  type CategoryValue,
  SORT_OPTIONS,
  type SortValue,
  categoryEmojis,
} from './constants';

type Props = {
  selectedCategory: CategoryValue;
  selectedSort: SortValue;
  onChangeCategory: (tab: CategoryValue) => void;
  onChangeSort: (tab: SortValue) => void;
};

export const GiftRankingFilter = ({
  selectedCategory,
  selectedSort,
  onChangeCategory,
  onChangeSort,
}: Props) => (
  <>
    <TabRow>
      {CATEGORY_OPTIONS.map(({ value, label }) => (
        <CategoryTab
          key={value}
          isSelected={selectedCategory === value}
          onClick={() => onChangeCategory(value)}
        >
          <TabCircle isSelected={selectedCategory === value}>
            {categoryEmojis[value]}
          </TabCircle>
          {label}
        </CategoryTab>
      ))}
    </TabRow>

    <SortRow>
      {SORT_OPTIONS.map(({ value, label }) => (
        <SortTab
          key={value}
          isSelected={selectedSort === value}
          onClick={() => onChangeSort(value)}
        >
          {label}
        </SortTab>
      ))}
    </SortRow>
  </>
);
