export type OrderFormKey = 'message' | 'senderName';
export type OrderFormErrors = Partial<Record<OrderFormKey, string>>;

export interface OrderInfo {
  productId: number;
  ordererName: string;
  message: string;
  messageCardId: string;
  receivers: Array<{
    name: string;
    phoneNumber: string;
    quantity: number;
  }>;
}

export interface CardTemplate {
  id: number;
  thumbUrl: string;
  imageUrl: string;
  defaultTextMessage: string;
}
