import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export interface OrderFormInputs {
  senderName: string;
  receiverName: string;
  receiverPhone: string;
  quantity: number;
}

export const useOrderForm = () => {
  const location = useLocation();
  const { imageURL, name, price, brandInfo } = location.state || {};

  const methods = useForm<OrderFormInputs>({
    defaultValues: {
      senderName: '',
      receiverName: '',
      receiverPhone: '',
      quantity: 1,
    },
  });

  const { setError, handleSubmit } = methods;

  const validatePhone = (phone: string): boolean => /^010\d{8}$/.test(phone);

  const onSubmit = (data: OrderFormInputs) => {
    let hasError = false;

    if (!validatePhone(data.receiverPhone)) {
      setError('receiverPhone', { message: '전화번호를 입력해주세요.' });
      hasError = true;
    }

    if (!hasError) {
      console.log('주문 처리', data);
    }
  };

  return {
    imageURL,
    name,
    price,
    brandInfo,
    methods,
    handleSubmit: handleSubmit(onSubmit),
  };
};
