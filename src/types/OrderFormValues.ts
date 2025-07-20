import type { Recipient } from './Recipient';

export interface OrderFormValue {
  msg: string;
  msgId: string;
  sendName: string;
  recipients: Recipient[];
  total_count: number;
}
