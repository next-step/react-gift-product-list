export const Target_MAP = {
  전체: 'ALL',
  여성이: 'FEMALE',
  남성이: 'MALE',
  청소년이: 'TEEN',
} as const;

// 탭 (랭킹 타입)
export const Rank_MAP = {
  '받고 싶어한': 'MANY_WISH',
  '많이 선물한': 'MANY_RECEIVE',
  '위시로 받은': 'MANY_WISH_RECEIVE',
} as const;

export type TargetType = keyof typeof Target_MAP;
export type RankType = keyof typeof Rank_MAP;

export const TargetS = Object.keys(Target_MAP) as TargetType[];
export const RankS = Object.keys(Rank_MAP) as RankType[];

export interface Product {
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
}

export interface RankedProduct extends Product {
  ranking: number;
}

export interface FilterProps {
  selected: string;
  onSelect: (label: string) => void;
}

export interface GridProps {
  products: RankedProduct[];
  loading: boolean;
  hasError: boolean;
  isExpanded: boolean;
  toggleExpand: () => void;
  onClickItem: (item: RankedProduct) => void;
}
