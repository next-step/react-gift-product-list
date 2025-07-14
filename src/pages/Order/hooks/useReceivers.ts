import { useState } from 'react';
import {
  receiverListSchema,
  receiverSchema,
  type Receiver,
  type ReceiverError,
} from '../schemas/receiverSchema';

export const useReceivers = (initialReceivers: Receiver[]) => {
  const [receivers, setReceivers] = useState<Receiver[]>(initialReceivers);

  const addReceiver = () => {
    if (receivers.length >= 10) return;
    setReceivers((prev) => [...prev, { name: '', phone: '', quantity: 1 }]);
  };

  const removeReceiver = (index: number) => {
    setReceivers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateReceiver = (index: number, field: keyof Receiver, value: string) => {
    const updated = [...receivers];
    const current = updated[index];

    updated[index] = {
      ...current,
      [field]: field === 'quantity' ? Number(value) : value,
    };

    setReceivers(updated);
  };

  const validate = (_index: number, receiver: Receiver): ReceiverError => {
    const result = receiverSchema.safeParse(receiver);

    if (result.success) return {};

    return result.error.issues.reduce((acc: ReceiverError, issue) => {
      const fieldName = issue.path[0] as keyof Receiver;
      if (fieldName) {
        acc[fieldName] = issue.message;
      }
      return acc;
    }, {});
  };

  const getErrors = (): ReceiverError[] => {
    return receivers.map((receiver, index) => validate(index, receiver));
  };

  const validateAll = (): boolean => {
    const result = receiverListSchema.safeParse(receivers);

    if (!result.success) {
      return false;
    }

    return true;
  };

  const errors = getErrors();

  return {
    receivers,
    errors,
    addReceiver,
    removeReceiver,
    updateReceiver,
    validateAll,
  };
};

export type { Receiver, ReceiverError };
