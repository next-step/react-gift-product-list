import styled from '@emotion/styled';
import MessageCardSection from './components/MessageCardSection';
import MessageInput from './components/MessageInput';
import SenderInfo from './components/SenderInfo';
import ReceiverField from './components/ReceiverField';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { ROUTES } from '@/routes/routes';
import toLocaleString from '@/utils/toLocaleString';
import useRanking from './hooks/useRnaking';
import ProductInfo from './components/ProductInfo';
import { useUserInfo } from '@/contexts/UserInfoContext';
import { useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/api/apiBaseUrl';
import { toast } from 'react-toastify';

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
export interface OrderInfoValues {
  message: string;
  name: string;
  receivers: { name: string; phoneNumber: string; quantity: number }[];
}

const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { productSummaryData } = useRanking(id as string);
  const { userInfo } = useUserInfo();
  const orderForm = useForm<OrderInfoValues>({
    defaultValues: { message: '축하해요.', name: userInfo.name, receivers: [] },
  });

  const watch = orderForm.watch;
  const { message, name, receivers } = watch();

  // console.log(message, name, receivers);

  const onSubmit = () => {
    alert('주문 성공!');
    navigate(ROUTES.HOME);
  };

  useEffect(() => {
    const data = {
      productId: Number(id),
      message: message,
      messageCardId: 'card123',
      ordererName: name,
      receivers: receivers,
    };

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.token,
      },
    };
    const dataFetch = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/order`, data, headers);
        console.log(response.data.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.data?.data?.statusCode;
          toast(
            status && status >= 400 && status < 500
              ? error.response?.data?.data?.message
              : '기타 에러 발생(서버 에러, 네트워크 에러 등)'
          );
          if (status === 401) {
            navigate(ROUTES.LOGIN);
          }
        }
        return false;
      }
    };

    dataFetch();
  }, []);

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
            <OrderButton type="submit">{toLocaleString(29000)}원 주문하기</OrderButton>
          </form>
        </FormProvider>
      </Section>
    </>
  );
};

export default OrderPage;
