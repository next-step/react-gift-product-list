export type ReceiverForOrder = {
  name: string;
  phoneNumber: string;
  quantity: number;
};

export type OrderData = {
  productId: number;
  message: string;
  messageCardId: number;
  ordererName: string;
  receivers: ReceiverForOrder[];
};
