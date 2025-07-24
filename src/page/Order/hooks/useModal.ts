import { useFieldArray, useForm } from 'react-hook-form';
import type { OrderInfoValues } from '..';

interface UseModalProps {
  receiverInfos: OrderInfoValues['receiverInfos'];
  handleChange: (value: OrderInfoValues['receiverInfos']) => void;
  onClose: () => void;
}

const useModal = ({ receiverInfos, handleChange, onClose }: UseModalProps) => {
  const receiverInfosForm = useForm<OrderInfoValues>({
    defaultValues: {
      receiverInfos: receiverInfos,
    },
  });

  const receiverInfoArray = useFieldArray({
    control: receiverInfosForm.control,
    name: 'receiverInfos',
  });

  const onSubmit = async () => {
    const isValid = await receiverInfosForm.trigger();
    if (isValid) {
      const receiverInfos = receiverInfosForm.getValues('receiverInfos');
      handleChange(receiverInfos);
      onClose();
    }
  };

  return { receiverInfosForm, receiverInfoArray, onSubmit };
};
export default useModal;
