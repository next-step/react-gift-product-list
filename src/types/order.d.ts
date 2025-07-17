export interface Receiver {
  name: string;
  phoneNumber: string;
  quantity: number;
}

export interface OrderRequest {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: Receiver[];
}

export type FormValues = {
  modalReceiver: Receiver[];
  receiver: Receiver[];
};

export type OrderFormValue = {
  message: string;
  sender: string;
  receiver: Receiver[];
};
