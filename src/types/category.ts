export const CATEGORY_TYPE = {
  MANY_WISH: 'MANY_WISH',
  MANY_RECEIVE: 'MANY_RECEIVE',
  MANY_WISH_RECEIVE: 'MANY_WISH_RECEIVE',
} as const;

export type CategoryType = (typeof CATEGORY_TYPE)[keyof typeof CATEGORY_TYPE];
