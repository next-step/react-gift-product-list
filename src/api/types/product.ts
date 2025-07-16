// * 타겟 타입
export enum TargetType {
  ALL = 'ALL',
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  TEEN = 'TEEN',
}
// * 랭크 타입
export enum RankType {
  MANY_WISH = 'MANY_WISH',
  MANY_RECEIVE = 'MANY_RECEIVE',
  MANY_WISH_RECEIVE = 'MANY_WISH_RECEIVE',
}

// * 상품 브랜드 정보 인터페이스
export interface BrandInfo {
  id: number
  name: string
  imageURL: string
}

// * 상품 가격 인터페이스
export interface ProductPrice {
  basicPrice: number
  discountRate: number
  sellingPrice: number
}

// * 상품 전체 인터페이스
export interface Product {
  id: number
  name: string
  imageURL: string
  price: ProductPrice
  brandInfo: BrandInfo
}

// * 유효성 검증 함수 (외부 입력 시 오류 방지)
export function isValidTargetType(value: string): value is TargetType {
  return Object.values(TargetType).includes(value as TargetType)
}

export function isValidRankType(value: string): value is RankType {
  return Object.values(RankType).includes(value as RankType)
}
