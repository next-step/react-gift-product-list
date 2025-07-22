import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import CardSelector from '@/components/OrderSection/CardSelector';
import MessageInput from '@/components/OrderSection/MessageInput';
import SenderForm from '@/components/OrderSection/SenderForm';
import ReceiverForm from '@/components/ReceiverFormSection/ReceiverForm';
import ProductInfo from '@/components/OrderSection/ProductInfo';
import OrderSubmitButton from '@/components/OrderSection/OrderSubmitButton';
import { ROUTES } from '@/constants/routes';
import { FormProvider } from 'react-hook-form';
import { useOrderForm } from '@/hooks/useOrderForm';
import type { OrderFormValues } from '@/types/order';
import { loading } from '@/components/common/Loading';
import { ORDER_API_URL } from '@/hooks/constants/api';
import { ERROR_MESSAGES } from '@/constants/validation';
import { useProductSummary } from '@/hooks/useProductSummary';
import { hasAxiosErrorStatus } from '@/utils/error';

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { product, isLoading } = useProductSummary(id);

  const {
    methods,
    handleSubmit,
    handleCardChange,
    selectedCardId,
    totalPrice,
    totalQuantity,
  } = useOrderForm(product);

  const { authToken } = useAuth();

  const onSubmit = async (data: OrderFormValues) => {
    if (data.receivers.length === 0) {
      toast.error(ERROR_MESSAGES.EMPTY_RECEIVERS);
      return;
    }

    try {
      await axios.post(
        ORDER_API_URL,
        {
          productId: product?.id,
          message: data.textMessage,
          messageCardId: String(selectedCardId),
          ordererName: data.senderName,
          receivers: data.receivers.map(r => ({
            name: r.name,
            phoneNumber: r.phone,
            quantity: r.quantity,
          })),
        },
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );

      alert(
        `주문이 완료되었습니다.\n` +
          `상품명: ${product?.name}\n` +
          `구매 수량: ${totalQuantity}\n` +
          `발신자 이름: ${data.senderName}\n` +
          `메시지: ${data.textMessage}`
      );
      navigate(ROUTES.HOME);
    } catch (err: unknown) {
      if (hasAxiosErrorStatus(err, 401)) {
        toast.error(ERROR_MESSAGES.LOGIN_REQUIRED);
        navigate(ROUTES.LOGIN, {
          state: {
            from: {
              pathname: location.pathname,
              search: location.search,
            },
          },
        });
      } else {
        toast.error(ERROR_MESSAGES.ORDER_FAIL);
      }
    }
  };

  if (isLoading) return loading;
  if (!product) return <div>{ERROR_MESSAGES.INVALID_ACCESS}</div>;

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
            <ProductInfo {...product} />
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
