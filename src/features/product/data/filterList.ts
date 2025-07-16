import { RankType, TargetType } from '@/api/types/product'

// * 실시간 급상승 필터 아이템 리스트
export const FilterItems = [
  {
    id: 1,
    label: '전체',
    value: TargetType.ALL,
    icon: 'ALL',
  },
  {
    id: 2,
    label: '여성이',
    value: TargetType.FEMALE,
    icon: '👩🏻',
  },
  {
    id: 3,
    label: '남성이',
    value: TargetType.MALE,
    icon: '👨🏻',
  },
  {
    id: 4,
    label: '청소년이',
    value: TargetType.TEEN,
    icon: '👦🏻',
  },
]

// * 실시간 급상승 랭크 아이템 리스트
export const RankItems = [
  {
    id: 1,
    label: '받고 싶어한',
    value: RankType.MANY_WISH,
  },
  {
    id: 2,
    label: '많이 선물한',
    value: RankType.MANY_RECEIVE,
  },
  {
    id: 3,
    label: '위시로 받은',
    value: RankType.MANY_WISH_RECEIVE,
  },
]
