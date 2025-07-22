import styled from '@emotion/styled';
import MessageCardSection from './components/MessageCardSection';
import MessageInput from './components/MessageInput';
import SenderInfo from './components/SenderInfo';
import ReceiverField from './components/ReceiverField';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import toLocaleString from '@/utils/toLocaleString';
import useRanking from './hooks/useRnaking';
import ProductInfo from './components/ProductInfo';
import { useUserInfo } from '@/contexts/UserInfoContext';
import postOrderInfo from './utils/postOrderInfo';
import { toast } from 'react-toastify';
import { ROUTES } from '@/routes/routes';

export interface OrderInfoValues {
  message: string;
  name: string;
  receiverInfos: { name: string; phoneNumber: string; quantity: number }[];
}

const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { productSummaryData } = useRanking(id as string);
  const { userInfo } = useUserInfo();
  const orderForm = useForm<OrderInfoValues>({
    defaultValues: { message: '축하해요.', name: userInfo.name, receiverInfos: [] },
  });
  const orderData = orderForm.getValues();
  const price = orderData.receiverInfos.length * (productSummaryData?.price || 0);

  const onSubmit = async () => {
    if (!id) return;
    if (orderData.receiverInfos.length <= 0) {
      toast('받는 사람이 없습니다');
      return;
    }

    const token = userInfo.authToken;
    const isSuccess = await postOrderInfo({
      orderData,
      navigate,
      id,
      token,
    });

    if (isSuccess) {
      alert(`
      주문이 완료되었습니다.
      상품명: ${productSummaryData?.name}
      구매 수량: ${orderData.receiverInfos.length}
      발신자 이름: ${orderData.name}
      메시지: ${orderData.message}`);
      navigate(ROUTES.HOME);
    }
  };

  return (
    <>
      <Section>
        <FormProvider {...orderForm}>
          <form onSubmit={orderForm.handleSubmit(onSubmit)}>
            <MessageCardSection />
            <MessageInput />
            <SenderInfo />
            <ReceiverField />
            {productSummaryData && <ProductInfo productSummaryData={productSummaryData} />}
            <OrderButton type="submit">{toLocaleString(price)}원 주문하기</OrderButton>
          </form>
        </FormProvider>
      </Section>
    </>
  );
};

export default OrderPage;

const Section = styled.section`
  width: 100%;
  max-width: 720px;
  padding-bottom: 3.125rem;
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
`;

const OrderButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.semantic.brand.kakaoYellow};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  font-size: ${({ theme }) => theme.typography.subtitle1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.subtitle1Regular.fontWeight};
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.semantic.brand.kakaoYellowPressed};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
