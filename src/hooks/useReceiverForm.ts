import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useReceiver } from '@/contexts/ReceiverContext';
import { receiversModalSchema, type ReceiversFormData } from '@/utils/validation/schema/receivers';
import { orderFormSchema } from '@/utils/validation/schema/orderForm';

export const useReceiverForm = () => {
  const { receiverList, updateReceiverList } = useReceiver();

  const form = useForm<ReceiversFormData>({
    resolver: zodResolver(receiversModalSchema),
    defaultValues: { receivers: receiverList },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'receivers',
  });

  const addReceiver = () => {
    append({ name: '', phone: '', quantity: 1 });
  };

  const handleFormSubmit = (onSuccess?: () => void) => {
    const submitResult = form.handleSubmit((data) => {
      updateReceiverList(data.receivers);
      onSuccess?.();
    });
  
    return submitResult();
  };

  const canAddMore = fields.length < 10;

  const canOrder = () => {
    const currentReceivers = form.getValues('receivers');
    const result = orderFormSchema.shape.receivers.safeParse(currentReceivers);
    return result.success;
  };

  return {
    register: form.register,
    formState: form.formState,
    getValues: form.getValues,
    handleSubmit: handleFormSubmit,
    fields,
    addReceiver,
    remove,  
    canAddMore,
    canOrder,
  };
};
