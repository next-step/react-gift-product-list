export  interface ProductItem {
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
  }

  export  interface ProductItemSummary {
    id: 11526198,
    name: string;
    brandName: string;
    price: number
    imageURL: string;
}