export interface GenderItems {
  key: string;
  icon: string;
  label: string;
}

export const genderItems: GenderItems[] = [
  { key: 'ALL', icon: 'ALL', label: '전체' },
  { key: 'FEMALE', icon: '👩🏻', label: '여성이' },
  { key: 'MALE', icon: '👨🏻', label: '남성이' },
  { key: 'TEEN', icon: '👦🏻', label: '청소년이' }
];

export interface ActionItems {
  key: string;
  label: string;
}

export const actionItems: ActionItems[] = [
  {key: 'MANY_WISH', label: '받고 싶어한'}, 
  {key: 'MANY_RECEIVE', label: '많이 선물한'}, 
  {key: 'MANY_WISH_RECEIVE', label: '위시로 받은'}
];
