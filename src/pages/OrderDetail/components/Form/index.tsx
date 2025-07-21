import styled from '@emotion/styled';
import { OrderFormSubmitButton } from './SubmitButton';
import { OrderFormMessageFields } from './MessageFields';
import { MOCK_MESSAGE_CARD_LIST } from './MessageFields/mock';
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import { OrderFormOrdererFields } from './OrdererFields';
import { OrderFormOrderSummary } from './OrderSummary';
import { OrderFormReceiversFields } from './ReceiversFields';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderFormSchema, type OrderFormData } from '@/schemas/orderForm';
import { useRead } from '@/hooks/useRead';
import { getProductsSummary } from '@/apis/domain/products/getProductsSummray';
import { Spinner } from '@/components/common/Spinner';
import { useEffect } from 'react';
import { useUserInfo } from '@/providers/UserInfo';
import { toast } from 'react-toastify';
import { ROUTE_PATH } from '@/pages/Routes';
import { useNavigate } from 'react-router';

type Props = {
  productId: string;
};

export const OrderForm = ({ productId }: Props) => {
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useRead({
    fetch: getProductsSummary,
    initFetchParams: {
      productId,
    },
  });

  const formHandler = useForm<OrderFormData>({
    defaultValues: {
      message: MOCK_MESSAGE_CARD_LIST[0].defaultTextMessage,
      messageCardId: MOCK_MESSAGE_CARD_LIST[0].id.toString(),
      ordererName: userInfo?.name ?? '',
      receivers: [],
    },
    resolver: zodResolver(orderFormSchema),
  });

  useEffect(() => {
    if (isError) {
      const message = error?.message;
      if (message) {
        toast.error(message);
      }

      navigate(ROUTE_PATH.HOME);
    }
  }, [isError, error]);

  if (isLoading || isError)
    return (
      <LoadingWrapper>
        <Spinner size='large' color='kakaoBrown' />
      </LoadingWrapper>
    );

  const productSummary = data?.data;

  return (
    <Wrapper>
      <OrderFormMessageFields formHandler={formHandler} />
      <HorizontalSpacing size='spacing2' color='gray200' />
      <OrderFormOrdererFields formHandler={formHandler} />
      <HorizontalSpacing size='spacing2' color='gray200' />
      <OrderFormReceiversFields formHandler={formHandler} />
      <HorizontalSpacing size='spacing2' color='gray200' />
      {productSummary && <OrderFormOrderSummary productSummary={productSummary} />}
      <OrderFormSubmitButton
        productId={productId}
        formHandler={formHandler}
        productSummary={productSummary!}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section(({ theme }) => ({
  width: '100%',
  paddingBottom: '3.125rem',
  backgroundColor: theme.colors.semantic.background.default,
}));

export const LoadingWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 2.75rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;
