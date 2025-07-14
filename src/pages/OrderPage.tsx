import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import CardSelector from '@/components/OrderSection/CardSelector';
import MessageInput from '@/components/OrderSection/MessageInput';
import SenderForm from '@/components/OrderSection/SenderForm';
import ReceiverForm from '@/components/ReceiverFormSection/ReceiverForm';
import ProductInfo from '@/components/OrderSection/ProductInfo';
import OrderSubmitButton from '@/components/OrderSection/OrderSubmitButton';
import { ROUTES } from '@/constants/routes';
import { mockProducts } from '@/data/products';
import styled from '@emotion/styled';
import { FormProvider } from 'react-hook-form';
import { useOrderForm } from '@/hooks/useOrderForm';
import type { OrderFormValues } from '@/types/order';

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = mockProducts[Number(id) - 1];

  const {
    methods,
    handleSubmit,
    handleCardChange,
    selectedCardId,
    totalPrice,
    totalQuantity,
  } = useOrderForm(product);

  const onSubmit = (data: OrderFormValues) => {
    if (data.receivers.length === 0) {
      alert('받는 사람을 한 명 이상 추가해주세요.');
      return;
    }

    alert(
      `주문이 완료되었습니다.\n` +
        `상품명: ${product?.name}\n` +
        `구매 수량: ${totalQuantity}\n` +
        `발신자 이름: ${data.senderName}\n` +
        `메시지: ${data.textMessage}`
    );
    navigate(ROUTES.HOME);
  };

  if (!product) return <div>잘못된 접근입니다.</div>;

  return (
    <>
      <Navigation />
      <Main>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <CardSelector
              selectedCardId={selectedCardId}
              onSelect={handleCardChange}
            />
            <MessageInput />
            <SenderForm />
            <ReceiverForm />
            <ProductInfo product={product} />
            <OrderSubmitButton amount={totalPrice} />
          </Form>
        </FormProvider>
      </Main>
    </>
  );
};

export default OrderPage;

const Main = styled.main`
  background-color: ${({ theme }) => theme.color.semantic.background.default};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  margin-top: ${({ theme }) => theme.spacing[5]};
`;
