export const fetchThemes = async () => {
  const res = await fetch('/api/themes');
  if (!res.ok) throw new Error('테마 불러오기 실패');

  const data = await res.json();
  return data.data ?? [];
};
