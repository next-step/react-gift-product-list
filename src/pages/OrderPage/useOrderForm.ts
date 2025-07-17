import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { SENDER_NAME_ERROR } from '@/components/SenderForm/constants';
import {
  RECEIVER_REQUIRED_MESSAGE,
  ORDER_COMPLETE_MESSAGE,
  ORDER_PROCESSING_ERROR_MESSAGE,
  ORDER_ERROR_MESSAGE,
  LOGIN_REQUIRED_MESSAGE,
} from './constants';
import { useLogin } from '@/contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/paths';

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
  const navigate = useNavigate();

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
      const response = await axios.post(
        '/api/order',
        {
          productId: product!.id,
          message: data.message,
          messageCardId: data.messageCardId,
          ordererName: data.senderName,
          receivers: receivers.map((r) => ({
            name: r.name,
            phoneNumber: r.phone,
            quantity: r.quantity,
          })),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: userInfo?.authToken,
          },
        }
      );

      const responseData = response.data;

      if (responseData.data.success) {
        alert(
          `${ORDER_COMPLETE_MESSAGE}\n\n상품명: ${product!.name}\n총 수량: ${totalQuantity}개\n보내는 분: ${data.senderName}\n메시지: ${data.message}`
        );
        navigate(PATH.HOME);
      } else {
        alert(ORDER_PROCESSING_ERROR_MESSAGE);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert(LOGIN_REQUIRED_MESSAGE);
        navigate(PATH.LOGIN);
      } else {
        alert(ORDER_ERROR_MESSAGE);
      }
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
