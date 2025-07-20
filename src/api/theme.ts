import type { ThemeInfo } from '@/types/theme';
import type { Product } from '@/types/product';

export async function fetchThemeInfo(themeId: number) {
  const res = await fetch(`/api/themes/${themeId}/info`);
  if (!res.ok) throw new Error('테마 정보를 불러올 수 없습니다.');
  return res.json() as Promise<{ data: ThemeInfo }>;
}

export async function fetchThemeProducts(
  themeId: number,
  cursor = 0,
  limit = 10,
) {
  const res = await fetch(
    `/api/themes/${themeId}/products?cursor=${cursor}&limit=${limit}`,
  );
  if (!res.ok) throw new Error('상품 목록을 불러올 수 없습니다.');
  return res.json() as Promise<{
    data: { list: Product[]; cursor: number; hasMoreList: boolean };
  }>;
}
