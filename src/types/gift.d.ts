import { targetType, rankType } from "@/data/giftType";

export interface Price {
  basicPrice: number;
  discountRate: number;
  sellingPrice: number;
}

export interface BrandInfo {
  id: number;
  name: string;
  imageURL: string;
}

export interface Gift {
  id: number;
  name: string;
  imageURL: string;
  price: Price;
  brandInfo: BrandInfo;
}

export type TargetType = (typeof targetType)[number]["id"];

export type RankType = (typeof rankType)[number]["id"];
