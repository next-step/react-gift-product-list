export const VALID_GENDERS = ['all', 'female', 'male', 'teen'] as const;
export type GenderType = (typeof VALID_GENDERS)[number];

export const VALID_CATEGORIES = ['MANY_WISH', 'MANY_RECEIVE', 'MANY_WISH_RECEIVE'] as const;
export type CategoryType = (typeof VALID_CATEGORIES)[number];