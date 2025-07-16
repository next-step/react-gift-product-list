export type Product = {
  id: number;
  name: string;
  description?: string;
  price: {
    basicPrice: number;
    salePrice?: number;
  };
  imageUrl?: string;
};