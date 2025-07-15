const BASE_URL = 'http://localhost:3000';

export const fetchGiftRanking = async (
  filter: string,
  tab: string
) => {
  const res = await fetch(
    `${BASE_URL}/api/products/ranking?filter=${filter}&tab=${tab}`
  );
  if (!res.ok) throw new Error('선물랭킹을 불러오지 못했습니다.');
  return res.json();
};
