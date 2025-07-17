export const CATEGORY_TYPE = [
  { value: 'MANY_WISH', label: '받고 싶어한' },
  { value: 'MANY_RECEIVE', label: '많이 선물한' },
  { value: 'MANY_WISH_RECEIVE', label: '위시로 받은' },
] as const;

export type CategoryType = (typeof CATEGORY_TYPE)[number]['value'];

// export type CategoryType = (typeof CATEGORY_TYPE)[keyof typeof CATEGORY_TYPE];
