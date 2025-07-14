import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReceiverSchema } from '@/pages/OrderPage/schemas/orderSchema';
import { z } from 'zod';

type ReceiverFormType = z.infer<typeof ReceiverSchema>;

interface ReceiverModalProps {
  onClose: () => void;
  onAdd: (data: ReceiverFormType) => void;
  disabled: boolean;
}

const ReceiverModal = ({ onClose, onAdd, disabled }: ReceiverModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ReceiverSchema),
  });

  const onSubmit = (data: ReceiverFormType) => {
    if (!disabled) onAdd(data);
  };

  return (
    <div className="modal">
      <h2>받는 사람 추가</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>이름</label>
          <input {...register('receiverName')} />
          {errors.receiverName && <p>{errors.receiverName.message}</p>}
        </div>
        <div>
          <label>전화번호</label>
          <input {...register('receiverPhone')} />
          {errors.receiverPhone && <p>{errors.receiverPhone.message}</p>}
        </div>
        <div>
          <label>수량</label>
          <input type="number" defaultValue={1} {...register('quantity', { valueAsNumber: true })} />
          {errors.quantity && <p>{errors.quantity.message}</p>}
        </div>
        <button type="submit" disabled={disabled}>추가하기</button>
        <button type="button" onClick={onClose}>닫기</button>
      </form>
    </div>
  );
};

export default ReceiverModal;