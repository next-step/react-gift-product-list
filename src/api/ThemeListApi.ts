export async function fetchThemeInfo(themeId: number) {
  const res = await fetch(`/api/themes/${themeId}/info`);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || '테마 정보를 불러오는 데 실패했습니다.');
  }

  const data = await res.json();
  return data.data;
}

export async function fetchThemeProducts(themeId: number, cursor = 0, limit = 10) {
  console.log('🔍 Fetch products:', themeId, 'cursor:', cursor);

  const res = await fetch(`/api/themes/${themeId}/products?cursor=${cursor}&limit=${limit}`);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || '상품 목록을 불러오는 데 실패했습니다.');
  }

  const data = await res.json();
  console.log('✅ Received products:', data.data);
  return data.data;
}
