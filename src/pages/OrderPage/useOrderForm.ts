import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { SENDER_NAME_ERROR } from '@/components/SenderForm/constants';
import { RECEIVER_REQUIRED_MESSAGE } from './constants';
import { useLogin } from '@/contexts/LoginContext';

interface ReceiverFormInput {
  name: string;
  phone: string;
  quantity: number;
}

const OrderFormSchema = z.object({
  senderName: z.string().nonempty(SENDER_NAME_ERROR),
  message: z.string().optional(),
  messageCardId: z.string().nonempty(),
});

type OrderFormValues = z.infer<typeof OrderFormSchema>;
type Receivers = ReceiverFormInput[];

export function useOrderForm(
  product: { id: number; name: string; price: number } | null,
  senderName?: string
) {
  const { userInfo } = useLogin();
  const [receivers, setReceivers] = useState<Receivers>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: { senderName: senderName, message: '', messageCardId: '' },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<OrderFormValues> = async (data) => {
    if (receivers.length === 0) {
      alert(RECEIVER_REQUIRED_MESSAGE);
      return;
    }

    try {
      const response = await axios.post('/api/order', {
        productId: product!.id,
        message: data.message,
        messageCardId: data.messageCardId,
        ordererName: data.senderName,
        receivers: receivers.map((r) => ({
          name: r.name,
          phoneNumber: r.phone,
          quantity: r.quantity,
        })),
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userInfo?.authToken,
        },
      });

      const responseData = response.data;

      if (responseData.data.success) {
        alert('주문이 완료되었습니다.');
      } else {
        alert('주문 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      alert('주문 중 오류가 발생했습니다.');
    }
  };

  const handleReceiverModalComplete = (
    selectedReceivers: ReceiverFormInput[]
  ) => {
    setReceivers(selectedReceivers);
  };

  const totalQuantity = receivers.reduce((sum, r) => sum + r.quantity, 0);

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    onSubmit,
    receivers,
    handleReceiverModalComplete,
    totalQuantity,
  };
}
