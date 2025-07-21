export async function fetchThemeInfo(themeId: number) {
  const res = await fetch(`/api/themes/${themeId}/info`);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || '테마 정보를 불러오는 데 실패했습니다.');
  }

  const data = await res.json();
  return data.data;
}
