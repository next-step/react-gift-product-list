import type { AxiosResponse } from 'axios';
import type { ApiErrorResponse } from '@/apis/types';
import { API_THEMES_PATH } from './path';
import { apiInstance } from '@/apis/instance';
import type { ThemeInfo } from './type';

type GetThemeInfoParams = {
  themeId: string;
};

export const getThemeInfo = async (
  params: GetThemeInfoParams,
): Promise<AxiosResponse<{ data: ThemeInfo }, ApiErrorResponse>> => {
  return await apiInstance.get<{ data: ThemeInfo }>(API_THEMES_PATH.themeInfo(params.themeId));
};
