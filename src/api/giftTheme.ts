import { fetcher } from './client';

export const fetchGiftThemes = () => {
  return fetcher('/api/themes', '테마를 불러오지 못했습니다.');
};
