import axios from 'axios';
import useProductInfo from '@/hooks/useProductInfo';
import type { FormValues } from '@/types/orderFormType';
import styled from '@emotion/styled';
import { useFormContext, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import authApi from '@/api/authApi';

const Container = styled.button`
  all: unset;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 720px;
  height: 3rem;
  background-color: ${({ theme }) => theme.colors.yellow600};
`;

const Text = styled.div`
  ${({ theme }) => theme.typography.title2Bold};
`;

export const OrderButton = () => {
  const navigate = useNavigate();
  const {
    control,
    watch,
    formState: { isValid },
  } = useFormContext<FormValues>();
  const { messageCardId, id, name, price } = useProductInfo();
  const message = watch('message');
  const senderName = watch('senderName');
  const recipientInfo = useWatch({ control, name: 'recipientInfo' });
  const receivers = recipientInfo?.map(({ recipientName, phoneNumber, amount }) => ({
    name: recipientName,
    phoneNumber: formatPhoneNumber(phoneNumber),
    quantity: Number(amount),
  }));
  let totalAmount = 0;
  let totalPrice = 0;

  recipientInfo?.forEach((recipientForm) => {
    totalAmount = totalAmount + Number(recipientForm.amount);
  });
  totalPrice = price * totalAmount;

  const order = async () => {
    try {
      const response = await authApi.post('/api/order', {
        productId: id,
        message: message,
        messageCardId: messageCardId,
        ordererName: senderName,
        receivers: receivers,
      });
      console.log('주문 성공: ', response.data);
      alert(`
            주문이 완료되었습니다.
            상품명: ${name}
            구매 수량: ${totalAmount}
            발신자 이름: ${senderName}
            메시지: ${message}
          `);
      navigate('/');
    } catch (error) {
      console.log('주문 실패: ', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  return (
    <Container
      onClick={() => {
        if (isValid) order();
      }}
    >
      <Text>{totalPrice}원 주문하기</Text>
    </Container>
  );
};
