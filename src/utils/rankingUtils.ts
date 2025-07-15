export const getValidValue = <T extends string>(
  param: string | null,
  validValues: readonly string[],
  defaultValue: T
): T => {
  return validValues.includes(param as T) ? (param as T) : defaultValue;
};

export const getValidValues = (options: readonly { value: string }[]) =>
  options.map((option) => option.value);

import { products } from '@/data';
import type { Product } from '@/api/types';

// 기존 mock 데이터 형식을 API 형식으로 변환하는 함수
export const generateRankingProducts = (): Product[] => {
  const baseProduct = products.find((p) => p.brandInfo.name === 'BBQ');
  if (!baseProduct) {
    console.warn('BBQ 상품을 찾을 수 없습니다.');
    return [];
  }

  return Array.from({ length: 21 }, (_, index) => ({
    id: baseProduct.id + index + 1, // 고유 ID 생성
    name: baseProduct.name,
    price: baseProduct.price,
    imageURL: baseProduct.imageURL,
    brandInfo: baseProduct.brandInfo,
  }));
};
