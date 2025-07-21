export interface Order {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: [
    {
      name: string;
      phoneNumber: string ;
      quantity: number;
    },
  ];
}
