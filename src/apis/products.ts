import axios from 'axios';

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
  try {
    const response = await axios.get(`/api/products/${productId}/summary`, {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : '',
      },
    });

    if (!response.data?.data) {
      throw new Error('제품 데이터를 불러오지 못했습니다.');
    }

    return response.data.data;
  } catch (error: any) {
    const errData = error.response?.data;
    throw new Error(errData?.message || '제품 정보를 불러오는데 실패했습니다.');
  }
}
