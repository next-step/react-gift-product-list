import { useForm } from 'react-hook-form';
import { useState, useMemo } from 'react';
import { messageCards } from '@/data/messageCards';
import type { Product } from '@/types/product';
import type { OrderFormValues } from '@/types/order';

export const useOrderForm = (product: Product | undefined) => {
  const methods = useForm<OrderFormValues>({
    defaultValues: {
      senderName: '',
      textMessage: messageCards[0].defaultTextMessage,
      receivers: [],
    },
  });

  const { setValue, watch, handleSubmit } = methods;

  const [selectedCardId, setSelectedCardId] = useState(messageCards[0].id);

  const receiverList = watch('receivers');

  const totalQuantity = useMemo(
    () => receiverList.reduce((sum, r) => sum + r.quantity, 0),
    [receiverList]
  );

  const totalPrice = useMemo(
    () => (product ? totalQuantity * product.price.sellingPrice : 0),
    [totalQuantity, product]
  );

  const handleCardChange = (cardId: number) => {
    setSelectedCardId(cardId);
    const card = messageCards.find(c => c.id === cardId);
    if (card) {
      setValue('textMessage', card.defaultTextMessage);
    }
  };

  return {
    methods,
    handleSubmit,
    handleCardChange,
    selectedCardId,
    totalPrice,
    totalQuantity,
  };
};
