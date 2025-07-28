export interface Product {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandName: string;
}

export type GetRankingProductsResponse = {
  data: Product[];
};
