import { fetcher } from './client';

export const fetchGiftRanking = (filter: string, tab: string) => {
  const endpoint = `/api/products/ranking?filter=${filter}&tab=${tab}`;
  return fetcher(endpoint, '선물랭킹을 불러오지 못했습니다.');
};
