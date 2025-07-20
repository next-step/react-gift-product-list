export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageURL?: string;
};

export type ProductInfo = {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    name: string;
  };
};