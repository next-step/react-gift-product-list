import type { GenderType, CategoryType } from '@/constants/filters';
import { VALID_GENDERS, VALID_CATEGORIES } from '@/constants/filters';

export const isValidGender = (value: string): value is GenderType => {
  return VALID_GENDERS.includes(value as GenderType);
};

export const isValidCategory = (value: string): value is CategoryType => {
  return VALID_CATEGORIES.includes(value as CategoryType);
};