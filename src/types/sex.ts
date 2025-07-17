export const SEX_TYPE = [
  { value: 'ALL', label: '전체' },
  { value: 'MALE', label: '남성' },
  { value: 'FEMALE', label: '여성' },
  { value: 'TEEN', label: '청소년' },
] as const;

export type SexType = (typeof SEX_TYPE)[number]['value'];
