export type RankingProductType = {
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

export type ProductType = {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
};
