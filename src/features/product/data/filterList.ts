import type { TargetType, RankType } from '../types'

// * 실시간 급상승 필터 아이템 리스트
export const FilterItems = [
  {
    id: 1,
    label: '전체',
    value: 'ALL' as TargetType,
    icon: 'ALL',
  },
  {
    id: 2,
    label: '여성이',
    value: 'FEMALE' as TargetType,
    icon: '👩🏻',
  },
  {
    id: 3,
    label: '남성이',
    value: 'MALE' as TargetType,
    icon: '👨🏻',
  },
  {
    id: 4,
    label: '청소년이',
    value: 'TEEN' as TargetType,
    icon: '👦🏻',
  },
]

// * 실시간 급상승 랭크 아이템 리스트
export const RankItems = [
  {
    id: 1,
    label: '받고 싶어한',
    value: 'MANY_WISH' as RankType,
  },
  {
    id: 2,
    label: '많이 선물한',
    value: 'MANY_RECEIVE' as RankType,
  },
  {
    id: 3,
    label: '위시로 받은',
    value: 'MANY_WISH_RECEIVE' as RankType,
  },
]
