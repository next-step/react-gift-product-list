import type { Receiver } from "./Receiver";

export interface Order {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: Receiver[];
}
