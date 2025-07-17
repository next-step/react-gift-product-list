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

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductSummary | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get<{ data: ProductSummary }>(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}/summary`
        );
        setProduct(res.data.data);
      } catch (err: any) {
        toast.error('상품 정보를 불러오지 못했어요.', {
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
  } = useOrderForm(product);

  const { authToken } = useAuth();

  const onSubmit = async (data: OrderFormValues) => {
    if (data.receivers.length === 0) {
      toast.error('받는 사람을 한 명 이상 추가해주세요.');
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/order`,
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

      toast.success('주문이 완료되었습니다!');
      navigate(ROUTES.HOME);
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error('로그인이 필요합니다.');
        navigate(ROUTES.LOGIN, {
          state: {
            from: {
              pathname: location.pathname,
              search: location.search,
            },
          },
        });
      } else {
        toast.error('주문에 실패했어요. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  if (isLoading) return loading;
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
