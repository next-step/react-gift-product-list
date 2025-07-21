export type Product = {
  id: number;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export interface ProductList {
  list: Product[];
  cursor: number;
  hasMoreList: boolean;
}
