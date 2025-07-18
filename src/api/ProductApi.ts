import type { ProductSummary } from '@/types/Product';

export async function fetchProduct(productId: string): Promise<ProductSummary> {
  const res = await fetch(`/api/products/${productId}/summary`);

  if (!res.ok) {
    throw new Error('상품 정보를 불러오지 못했습니다.');
  }

  const json = await res.json();
  console.log('[상품 응답]', json);
  return json.data;
}
