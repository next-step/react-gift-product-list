import { z } from 'zod';

export const receiverSchema = z.object({
  receiver: z.string().min(1, '받는 사람 이름을 입력해주세요.'),
  phone: z.string().regex(/^010\d{8}$/, '전화번호 형식이 올바르지 않습니다.'),
  quantity: z.number().min(1, '수량은 최소 1개 이상이어야 합니다.'),
});

export const orderSchema = z
  .object({
    sender: z.string().min(1, '보내는 사람 이름을 입력해주세요.'),
    message: z.string().min(1, '메세지를 입력해주세요.'),
    receivers: z
      .array(receiverSchema)
      .min(1, '받는 사람은 최소 1명 이상이어야 합니다.'),
  })
  .superRefine((data, ctx) => {
    const seenPhones: string[] = [];

    data.receivers.forEach((receiver, index) => {
      if (seenPhones.includes(receiver.phone)) {
        ctx.addIssue({
          path: ['receivers', index, 'phone'],
          message: '중복된 전화번호가 있습니다.',
          code: 'custom',
        });
      } else {
        seenPhones.push(receiver.phone);
      }
    });
  });

export type Order = z.infer<typeof orderSchema>;
export type Receiver = z.infer<typeof receiverSchema>;
