import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import FilterButton from '@/components/common/FilterButton';

import {
  RANKING_FILTER_TYPE_KEY,
  RANKING_FILTER_RANK_TYPE_KEY,
  TARGET_TYPE,
  RANK_TYPE,
} from '@/constants/ranking';

const Title = styled.h1`
  display: flex;
  align-items: center;

  font-weight: bold;
  font-size: 20px;

  margin: 30px 10px 20px;
  padding: 10px 0px 0px 10px;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 10px;
  align-items: flex-end;
  flex-wrap: wrap;
`;

const TabBar = styled.div`
  display: flex;
  background: #f0f4ff;
  border: 3;
  border-color: #3182f6;
  border-radius: 12px;
  margin: 10px 20px 15px;
  overflow: hidden;
`;

const TabBtn = styled.button<{ active?: boolean }>`
  flex: 1;
  background: ${({ active }) => (active ? 'transparent' : 'transparent')};
  color: #3182f6;

  border: none;
  padding: 14px 0;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  transition: background 0.2s;

  outline: none;
  box-shadow: none;
  border: none;
  &:focus {
    outline: none;
    box-shadow: none;
    border: none;
  }
  &:active {
    outline: none;
    box-shadow: none;
    border: none;
  }
`;

const filterOptions = [
  {
    type: TARGET_TYPE.ALL,
    label: '전체',
    icon: <span className="icon">ALL</span>,
  },
  {
    type: TARGET_TYPE.FEMALE,
    label: '여성이',
    icon: <span className="icon">👩🏻</span>,
  },
  {
    type: TARGET_TYPE.MALE,
    label: '남성이',
    icon: <span className="icon">👨🏻</span>,
  },
  {
    type: TARGET_TYPE.TEENAGER,
    label: '청소년이',
    icon: <span className="icon">🧑🏻</span>,
  },
];
const tabList = [
  {
    type: RANK_TYPE.MANY_WISH,
    label: '받고 싶어한',
  },
  {
    type: RANK_TYPE.MANY_GIFT,
    label: '많이 선물한',
  },
  {
    type: RANK_TYPE.MANY_RECEIVE,
    label: '위시로 받은',
  },
];

function RankingFilter() {
  const [targetType, setTargetType] = useState(() => {
    return localStorage.getItem(RANKING_FILTER_TYPE_KEY) || TARGET_TYPE.ALL;
  });
  useEffect(() => {
    localStorage.setItem(RANKING_FILTER_TYPE_KEY, targetType);
  }, [targetType]);

  const [rankType, setRankType] = useState(() => {
    return (
      localStorage.getItem(RANKING_FILTER_RANK_TYPE_KEY) || RANK_TYPE.MANY_WISH
    );
  });
  useEffect(() => {
    localStorage.setItem(RANKING_FILTER_RANK_TYPE_KEY, rankType);
  }, [rankType]);

  return (
    <>
      <Title>실시간 급상승 선물랭킹</Title>

      <FilterBar>
        {filterOptions.map((option) => (
          <FilterButton
            key={option.type}
            active={targetType === option.type}
            onClick={() => setTargetType(option.type)}
          >
            {option.icon}
            {option.label}
          </FilterButton>
        ))}
      </FilterBar>
      <TabBar>
        {tabList.map((tab) => (
          <TabBtn
            key={tab.type}
            active={rankType === tab.type}
            onClick={() => setRankType(tab.type)}
          >
            {tab.label}
          </TabBtn>
        ))}
      </TabBar>
    </>
  );
}

export default RankingFilter;
