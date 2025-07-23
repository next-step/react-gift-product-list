import { zodResolver } from '@hookform/resolvers/zod';
import {
  multiOrderSchema,
  type MultiOrderFormData,
} from '@schemas/orderSchema';
import { useForm } from 'react-hook-form';
import cardTemplate from '@data/cardTemplate.json';

const useGiftOrderForm = () => {
  const methods = useForm<MultiOrderFormData>({
    resolver: zodResolver(multiOrderSchema),
    mode: 'onChange',
    defaultValues: {
      messageCardId: cardTemplate[0].id.toString(),
      message: cardTemplate[0].defaultTextMessage,
      sender: '',
      recipients: [],
    },
  });

  return methods;
};

export default useGiftOrderForm;
