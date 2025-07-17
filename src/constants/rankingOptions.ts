import type { TargetType, RankType } from '@/api/types';

export const targetOptions = [
  { value: 'ALL' as TargetType, label: '전체' },
  { value: 'FEMALE' as TargetType, label: '여성이' },
  { value: 'MALE' as TargetType, label: '남성이' },
  { value: 'TEEN' as TargetType, label: '청소년이' },
] as const;

export const rankOptions = [
  { value: 'MANY_WISH' as RankType, label: '받고 싶어한' },
  { value: 'MANY_RECEIVE' as RankType, label: '많이 선물한' },
  { value: 'MANY_WISH_RECEIVE' as RankType, label: '위시로 받은' },
] as const;
