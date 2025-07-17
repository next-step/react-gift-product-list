import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { type IFormData } from '@/pages/OrderPage/types';
import { Container, Input, Hint, ErrorMessage, Title } from './styles';
import { SENDER_TITLE, SENDER_HINT } from './constants';

interface SenderFormProps {
  register: UseFormRegister<IFormData>;
  errors: FieldErrors<IFormData>;
  productPrice: number;
}

function SenderForm({ register, errors }: SenderFormProps) {
  return (
    <Container>
      <Title>{SENDER_TITLE}</Title>
      <Input {...register('senderName')} />
      <Hint>{SENDER_HINT}</Hint>
      {errors.senderName && (
        <ErrorMessage>{errors.senderName.message}</ErrorMessage>
      )}
    </Container>
  );
}

export default SenderForm;
