import useFormInput from '@/hook/useFormInput';
import { validateName } from '@/utils/validateInput';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';

interface OrderContextType {
  message: string;
  setMessage: (msg: string) => void;
  messageCardId: string;
  setMessageCardId: (msg: string) => void;
  ordererName: ReturnType<typeof useFormInput>;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const ordererName = useFormInput(validateName, user?.name);
  const [message, setMessage] = useState('축하해요.');
  const [messageCardId, setMessageCardId] = useState('card123');

  const value = useMemo(
    () => ({
      ordererName,
      message,
      setMessage,
      messageCardId,
      setMessageCardId,
    }),
    [ordererName, message, setMessage, messageCardId, setMessageCardId]
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrfer 은 <OrderProvider> 에서만 써야 합니다');
  }

  return context;
};
