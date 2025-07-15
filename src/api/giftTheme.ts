const BASE_URL = 'http://localhost:3000';

export const fetchGiftThemes = async () => {
  const res = await fetch(`${BASE_URL}/api/themes`);
  if (!res.ok) throw new Error('테마를 불러오지 못했습니다.');
  return res.json();
};
