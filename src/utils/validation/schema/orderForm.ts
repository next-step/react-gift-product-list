import { z } from 'zod';
import { receiverSchema } from './receivers';

export const orderFormSchema = z.object({
  message: z.string().min(1, '메시지를 입력해주세요.'),
  sender: z.string().min(1, '보내는 사람 이름을 입력해주세요.'),
  receivers: z.array(receiverSchema)
    .min(1, '최소 1명의 받는 사람을 입력해주세요.')
    .max(10, '최대 10명까지만 추가할 수 있습니다.'), 
});

export type OrderFormSchema = z.infer<typeof orderFormSchema>; 