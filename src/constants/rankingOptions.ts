import type { TargetType, RankType } from '@/api/types';

export const targetOptions: { value: TargetType; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'FEMALE', label: '여성이' },
  { value: 'MALE', label: '남성이' },
  { value: 'TEEN', label: '청소년이' },
];

export const rankOptions: { value: RankType; label: string }[] = [
  { value: 'MANY_WISH', label: '받고 싶어한' },
  { value: 'MANY_RECEIVE', label: '많이 선물한' },
  { value: 'MANY_WISH_RECEIVE', label: '위시로 받은' },
];
