export type ReceiverForOrder = {
  name: string;
  phoneNumber: string;
  quantity: number;
};

export type OrderData = {
  productId: number;
  message: string;
  messageCardId: string; // string으로 수정
  ordererName: string;
  receivers: ReceiverForOrder[];
};
