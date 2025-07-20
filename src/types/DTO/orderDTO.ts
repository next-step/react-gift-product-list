export type ReceiverDTO = {
  name: string;
  phoneNumber: string;
  quantity: number;
};

export interface orderRequsetDTO {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: ReceiverDTO[];
}

export interface orderResponseDTO {
  data: {
    success: boolean;
  };
}
