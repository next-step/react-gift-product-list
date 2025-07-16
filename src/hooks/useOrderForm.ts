import { useForm } from 'react-hook-form';
import { useState, useMemo } from 'react';
import { messageCards } from '@/data/messageCards';
import type { OrderFormValues } from '@/types/order';
import { useAuth } from '@/contexts/AuthContext';

interface ProductSummary {
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export const useOrderForm = (product: ProductSummary | undefined) => {
  const { user } = useAuth();

  const methods = useForm<OrderFormValues>({
    defaultValues: {
      senderName: user?.name ?? '',
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
    () => (product ? totalQuantity * product.price : 0),
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
