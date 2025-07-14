import type { Receiver } from '@/types/receiver';

export type OrderFormValues = {
  senderName: string;
  textMessage: string;
  receivers: Receiver[];
};
