import { useEffect, useState } from 'react';
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

interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

const getProductSummaryUrl = (id: string) =>
  `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}/summary`;

const ORDER_API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/order`;

const ERROR_MESSAGES = {
  LOAD_PRODUCT_FAIL: '상품 정보를 불러오지 못했어요.',
  EMPTY_RECEIVERS: '받는 사람을 한 명 이상 추가해주세요.',
  ORDER_FAIL: '주문에 실패했어요. 잠시 후 다시 시도해주세요.',
  LOGIN_REQUIRED: '로그인이 필요합니다.',
  INVALID_ACCESS: '잘못된 접근입니다.',
};

const isAxiosErrorWithStatus = (
  err: unknown,
  status: number
): err is { response: { status: number } } =>
  typeof err === 'object' &&
  err !== null &&
  'response' in err &&
  typeof (err as any).response?.status === 'number' &&
  (err as any).response.status === status;

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductSummary | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get<{ data: ProductSummary }>(
          getProductSummaryUrl(id!)
        );
        setProduct(res.data.data);
      } catch {
        toast.error(ERROR_MESSAGES.LOAD_PRODUCT_FAIL, {
          toastId: 'product-load-fail',
        });
        navigate(ROUTES.HOME);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, navigate]);

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
      if (isAxiosErrorWithStatus(err, 401)) {
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
