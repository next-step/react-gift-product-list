import type { ThemeInfo } from '../types/GiftTheme';
import { fetcher } from './client';

export const fetchThemeInfo = async (
  themeId: number
): Promise<ThemeInfo> => {
  const endpoint = `/api/themes/${themeId}/info`;
  const res = await fetcher(
    endpoint,
    '상품정보를 불러오지 못했습니다.'
  );
  return res.data;
};
