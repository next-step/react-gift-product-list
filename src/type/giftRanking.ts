export const enum TargetType {
  ALL = 'ALL',
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  TEEN = 'TEEN',
}

export const enum RankType {
  MANY_WISH = 'MANY_WISH',
  MANY_RECEIVE = 'MANY_RECEIVE',
  MANY_WISH_RECEIVE = 'MANY_WISH_RECEIVE',
}

export const TargetFilterOption = [
  { type: TargetType.ALL, icon: 'ALL', label: '전체' },
  { type: TargetType.FEMALE, icon: '👩🏻', label: '여성이' },
  { type: TargetType.MALE, icon: '👨🏻', label: '남성이' },
  { type: TargetType.TEEN, icon: '👦🏻', label: '청소년' }
]

export const RankFilterOption = [
  { type: RankType.MANY_WISH, text: '받고싶어한' },
  { type: RankType.MANY_RECEIVE, text: '많이 선물한' },
  { type: RankType.MANY_WISH_RECEIVE, text: '위시로 받은' },
]