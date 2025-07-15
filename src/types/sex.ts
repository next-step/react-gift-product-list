export const SEX_TYPE = {
  ALL: 'ALL',
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  TEEN: 'TEEN',
} as const;

export type SexType = typeof SEX_TYPE[keyof typeof SEX_TYPE];
