import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReceiversModel, type ReceiversModelType } from '@/models/OrderFormModel';
import { useOrderStore } from '@/stores/orderStore';
import { useModal } from '@/contexts/ModalContext';
import { useEffect } from 'react';

export function useReceiverForm() {
  const { close } = useModal();
  const { receivers, setReceivers } = useOrderStore();

  const methods = useForm<ReceiversModelType>({
    resolver: zodResolver(ReceiversModel),
    defaultValues: { receivers: [] }, // receivers 배열을 포함하는 객체로 초기화
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'receivers',
  });

  useEffect(() => {
    if (receivers.length > 0) {
      methods.reset({ receivers: receivers });
    } else {
      methods.reset({ receivers: [{ receiverName: '', phoneNumber: '', quantity: 1 }] });
    }
  }, [receivers, methods]);

  const onSubmit = (data: ReceiversModelType) => {
    setReceivers(data.receivers);
    close();
  };

  // console.log('fields in useReceiverForm:', fields);
  return { methods, fields, append, remove, onSubmit };
}
