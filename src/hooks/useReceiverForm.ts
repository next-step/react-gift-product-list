import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import type { Receiver } from '@/types/receiver';

export const useReceiverForm = (initialValues: Receiver[]) => {
  const methods = useForm<{ receivers: Receiver[] }>({
    defaultValues: { receivers: initialValues },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { control, reset, getValues, trigger } = methods;

  const { fields, append, remove } = useFieldArray({
    name: 'receivers',
    control,
  });

  useEffect(() => {
    reset({ receivers: initialValues });
  }, [initialValues, reset]);

  const canAddMore = fields.length < 10;
  const confirmButtonLabel = `총 ${fields.length}명 완료`;

  return {
    methods,
    fields,
    append,
    remove,
    canAddMore,
    confirmButtonLabel,
    trigger,
    getValues,
  };
};
