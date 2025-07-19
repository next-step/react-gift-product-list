import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SENDER_NAME_ERROR } from '@/components/SenderForm/constants';
import {
  RECEIVER_REQUIRED_MESSAGE,
  ORDER_COMPLETE_MESSAGE,
  ORDER_ERROR_MESSAGE,
} from './constants';
import useApi from '@/apis/useApi';
import { toast } from 'react-toastify';
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
  const [receivers, setReceivers] = useState<Receivers>([]);
  const navigate = useNavigate();

  const { execute: postOrder } = useApi<
    { data: { success: boolean } },
    {
      productId: number;
      message?: string;
      messageCardId: string;
      ordererName: string;
      receivers: { name: string; phoneNumber: string; quantity: number }[];
    }
  >('post', '/order', {
    onError: () => {
      toast.error(ORDER_ERROR_MESSAGE);
    },
  });

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

  const onSubmit: SubmitHandler<OrderFormValues> = async (formData) => {
    if (receivers.length === 0) {
      toast.error(RECEIVER_REQUIRED_MESSAGE);
      return;
    }

    await postOrder({
      productId: product!.id,
      message: formData.message,
      messageCardId: formData.messageCardId,
      ordererName: formData.senderName,
      receivers: receivers.map((r) => ({
        name: r.name,
        phoneNumber: r.phone,
        quantity: r.quantity,
      })),
    });

    alert(
      `${ORDER_COMPLETE_MESSAGE}\n상품명: ${product!.name}\n총 수량: ${totalQuantity}개\n보내는 분: ${formData.senderName}\n메시지: ${formData.message}`
    );
    navigate(PATH.HOME);
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

