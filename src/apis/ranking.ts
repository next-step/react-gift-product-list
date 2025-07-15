import axios from 'axios';

export type Price = {
  basicPrice: number;
  sellingPrice: number;
  discountRate: number;
};

export type BrandInfo = {
  id: number;
  name: string;
  imageURL: string;
};

export type RankingItem = {
  id: number;
  name: string;
  price: Price;
  imageURL: string;
  brandInfo: BrandInfo;
};

export type RankingResponse = {
  data: RankingItem[];
};

const genderToTargetTypeMap: Record<string, string> = {
  전체: 'ALL',
  여성이: 'FEMALE',
  남성이: 'MALE',
  청소년이: 'TEEN',
};

const giftTypeToRankTypeMap: Record<string, string> = {
  '받고 싶어한': 'MANY_WISH',
  '많이 선물한': 'MANY_RECEIVE',
  '위시로 받은': 'MANY_WISH_RECEIVE',
};

export const fetchRanking = async (
  gender: string,
  giftType: string
): Promise<RankingItem[]> => {
  try {
    const targetType = genderToTargetTypeMap[gender] || 'ALL';
    const rankType = giftTypeToRankTypeMap[giftType] || 'MANY_WISH';

    const response = await axios.get<RankingResponse>('/api/products/ranking', {
      params: { targetType, rankType },
    });
    return response.data.data;
  } catch (error) {
    console.error('Ranking API 호출 실패:', error);
    return [];
  }
};
