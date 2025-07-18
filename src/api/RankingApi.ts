const targetMap: Record<string, string> = {
  all: 'ALL',
  female: 'FEMALE',
  male: 'MALE',
  teen: 'TEEN',
};

const typeMap: Record<string, string> = {
  want: 'MANY_WISH',
  give: 'MANY_RECEIVE',
  wish: 'MANY_WISH_RECEIVE',
};

export const fetchRanking = async (gender: string, type: string) => {
  const targetType = targetMap[gender] || 'ALL';
  const rankType = typeMap[type] || 'MANY_WISH_RECEIVE';

  const res = await fetch(`/api/products/ranking?targetType=${targetType}&rankType=${rankType}`);
  if (!res.ok) throw new Error('랭킹 불러오기 실패');

  const data = await res.json();
  return data.data ?? [];
};
