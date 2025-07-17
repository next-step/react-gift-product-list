interface OrderReceiver {
  name: string;
  phoneNumber: string;
  quantity: number;
}

export interface Order {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: OrderReceiver[];
}
