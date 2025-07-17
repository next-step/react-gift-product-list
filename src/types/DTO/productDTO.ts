export const TargetType = {
  ALL: 'ALL',
  FEMALE: 'FEMALE',
  MALE: 'MALE',
  TEEN: 'TEEN',
} as const;
export type TargetType = (typeof TargetType)[keyof typeof TargetType];

export const RankType = {
  MANY_WISH: 'MANY_WISH',
  MANY_RECEIVE: 'MANY_RECEIVE',
  MANY_WISH_RECEIVE: 'MANY_WISH_RECEIVE',
} as const;
export type RankType = (typeof RankType)[keyof typeof RankType];

export interface RankingQuery {
  targetType?: TargetType;
  rankType?: RankType;
}

export type RankItemType = {
  id: number;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

export interface ProductDetailResponseDto {
  data: RankItemType[];
}
