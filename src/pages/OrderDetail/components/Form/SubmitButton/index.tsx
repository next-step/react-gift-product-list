import { postOrder } from '@/apis/domain/order/postOrder';
import type { ProductSummary } from '@/apis/domain/products/type';
import { ROUTE_PATH } from '@/pages/Routes';
import type { OrderFormData } from '@/schemas/orderForm';

import styled from '@emotion/styled';
import { AxiosError } from 'axios';
import type { UseFormReturn } from 'react-hook-form';

import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

type Props = {
  productId: string;
  formHandler: UseFormReturn<OrderFormData>;
  productSummary: ProductSummary;
};

export const OrderFormSubmitButton = ({ productId, formHandler, productSummary }: Props) => {
  const { watch, handleSubmit } = formHandler;

  const receivers = watch('receivers');
  const totalQuantity = receivers.reduce((sum, receiver) => sum + receiver.quantity, 0);
  const productPrice = productSummary.price * totalQuantity;

  const navigate = useNavigate();

  const handleSubmitForm = handleSubmit(async (formData) => {
    try {
      await postOrder({
        ...formData,
        productId: Number(productId),
      });

      alert(
        `주문이 완료되었습니다.\n상품명: ${productSummary.name}\n구매 수량: ${totalQuantity}\n발신자 이름: ${formData.ordererName}\n메시지: ${formData.message}`,
      );
      navigate(ROUTE_PATH.HOME);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.data.message;

        if (message) {
          toast.error(message);
        }

        if (error.response?.status === 401) {
          navigate(`${ROUTE_PATH.LOGIN}?redirect=${encodeURIComponent(window.location.pathname)}`);
        }
      }
    }
  });

  return <Wrapper onClick={handleSubmitForm}>{productPrice}원 주문하기</Wrapper>;
};

const Wrapper = styled.button(({ theme }) => ({
  width: '100%',
  maxWidth: '720px',
  height: '3.125rem',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  backgroundColor: theme.colors.semantic.brand.kakaoYellow,
  color: theme.colors.scale.gray900,

  transition: 'background-color 200ms, color 200ms',

  '&:disabled': {
    backgroundColor: theme.colors.scale.gray300,
    color: theme.colors.scale.gray600,
    cursor: 'not-allowed',
  },

  ...theme.typography.title2Bold,
}));
