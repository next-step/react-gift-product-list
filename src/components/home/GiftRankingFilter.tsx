import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import { IconFilterItem } from '../common/IconFilterItem';
import { RankingGrid } from './RankingGrid';
import { useGiftRankingFilter } from '../../hooks/useGiftRankingFilter';

const filters = [
  { key: 'ALL', label: '전체', icon: 'ALL' },
  { key: 'FEMALE', label: '여성', icon: '👩' },
  { key: 'MALE', label: '남성', icon: '👨' },
  { key: 'TEEN', label: '청소년', icon: '🧒' },
] as const;

type FilterKey = (typeof filters)[number]['key'];

const tabOptions = [
  '받고 싶어한',
  '많이 선물한',
  '위시로 받은',
] as const;

type TabOption = (typeof tabOptions)[number];

const IconFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: ${theme.typography.spacing.spacing4} 0px;
`;

const Container = styled.div`
  width: 100%;
  padding: 24px 0px;
  background-color: ${theme.colors.backgroundDefault};
`;

const Heading = styled.h2`
  ${theme.typography.title2Bold};
  margin-bottom: 16px;
  padding-left: 8px;
`;

const TabBar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${theme.colors.blue100};
  border-radius: 8px;
  overflow: hidden;
`;

const TabButton = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 12px 0;
  text-align: center;
  ${theme.typography.body2Bold};
  color: ${({ selected }) =>
    selected ? theme.colors.blue700 : theme.colors.blue300};
  background-color: transparent;
  border: none;
`;

export default function GiftRankingFilter() {
  const {
    selectedFilter,
    selectedTab,
    setSelectedFilter,
    setSelectedTab,
  } = useGiftRankingFilter();

  const handleFilterChange = (key: FilterKey) => {
    setSelectedFilter(key);
  };

  const handleTabChange = (tab: TabOption) => {
    setSelectedTab(tab);
  };

  return (
    <Container>
      <Heading>실시간 급상승 선물랭킹</Heading>

      <IconFilterContainer>
        {filters.map(({ key, label, icon }) => (
          <IconFilterItem
            key={key}
            label={label}
            icon={icon}
            selected={selectedFilter === key}
            onClick={() => handleFilterChange(key)}
          />
        ))}
      </IconFilterContainer>

      <TabBar>
        {tabOptions.map(tab => (
          <TabButton
            key={tab}
            selected={selectedTab === tab}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </TabButton>
        ))}
      </TabBar>
      <RankingGrid
        selectedFilter={selectedFilter}
        selectedTab={selectedTab}
      />
    </Container>
  );
}
