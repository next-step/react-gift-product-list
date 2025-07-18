type Recevier = {
  name: string;
  phoneNumber: string;
  quantity: number;
};
export type OrderFormData = {
  cardMessage: string;
  senderName: string;
  receivers: Recevier[];
};
