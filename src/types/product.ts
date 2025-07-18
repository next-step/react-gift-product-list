export type ProductType = {
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


 export type ProductSummaryType = {
   id: number;
   name: string;
   price: number;
   imageURL: string;
   brandName: string;
 };
