export interface Good {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}
export interface Goods {
  data: Good[];
}

export interface GoodSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}
