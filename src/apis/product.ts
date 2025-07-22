import axios from 'axios';

export const fetchThemeProducts = async (
  themeId: number,
  cursor: number,
  limit: number
) => {
  const response = await axios.get(`/api/themes/${themeId}/products`, {
    params: { cursor, limit },
  });

  const { list, cursor: nextCursor, hasMoreList } = response.data.data;

  if (!Array.isArray(list)) {
    throw new Error('상품 리스트 형식이 올바르지 않습니다.');
  }

  const parsedProducts = list.map((item: any) => ({
    id: item.id,
    imageUrl: item.imageURL,
    name: item.name,
    price: item.price.sellingPrice,
    brand: item.brandInfo.name,
  }));

  return { products: parsedProducts, nextCursor, hasMoreList };
};
