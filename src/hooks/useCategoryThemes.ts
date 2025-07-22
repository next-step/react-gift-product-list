import axios from 'axios';
import type { Category } from '@/types/category';
import { CATEGORY_THEMES_API_URL } from '@/hooks/constants/api';
import { useFetch } from './useFetch';

const fetchCategoryThemes = async (): Promise<Category[] | undefined> => {
  try {
    const res = await axios.get<{ data: Category[] }>(CATEGORY_THEMES_API_URL);
    return res.data.data;
  } catch {
    return undefined;
  }
};

export const useCategoryThemes = () => useFetch(fetchCategoryThemes);
