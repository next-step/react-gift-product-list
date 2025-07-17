export const CATEGORY_OPTIONS = [
  { value: 'ALL', label: '전체' },
  { value: 'FEMALE', label: '여성' },
  { value: 'MALE', label: '남성' },
  { value: 'TEEN', label: '10대' },
] as const;

export type CategoryValue = (typeof CATEGORY_OPTIONS)[number]['value'];
export type CategoryLabel = (typeof CATEGORY_OPTIONS)[number]['label'];

export const SORT_OPTIONS = [
  { value: 'MANY_WISH', label: '많이 찜한' },
  { value: 'MANY_RECEIVE', label: '많이 받은' },
  { value: 'MANY_WISH_RECEIVE', label: '많이 찜하고 받은' },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]['value'];
export type SortLabel = (typeof SORT_OPTIONS)[number]['label'];

export const categoryEmojis: Record<CategoryValue, string> = {
  ALL: 'ALL',
  FEMALE: '👩',
  MALE: '👨',
  TEEN: '👦',
};
