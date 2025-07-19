export interface ProductSummary {
  id: number;
  name: string;
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
}
