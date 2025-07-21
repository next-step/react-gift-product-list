import { apiInstance } from '@/apis/instance';
import type { ThemeListItem } from './type';
import { API_THEMES_PATH } from './path';
import type { AxiosResponse } from 'axios';
import type { ApiErrorResponse } from '@/apis/types';

export const getThemes = async (): Promise<
  AxiosResponse<{ data: ThemeListItem[] }, ApiErrorResponse>
> => {
  return await apiInstance.get<{ data: ThemeListItem[] }>(API_THEMES_PATH.base);
};
