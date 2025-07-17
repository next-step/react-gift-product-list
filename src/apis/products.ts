export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export async function fetchProductSummary(
  productId: string,
  authToken: string
): Promise<ProductSummary> {
  const res = await fetch(`/api/products/${productId}/summary`, {
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => null);
    throw new Error(errData?.message || '제품 정보를 불러오는데 실패했습니다.');
  }

  const json = await res.json();

  if (!json.data) {
    throw new Error('제품 데이터를 불러오지 못했습니다.');
  }

  return json.data;
}
