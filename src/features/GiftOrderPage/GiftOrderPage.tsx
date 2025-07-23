import Divider from '@components/common/Divider';
import LoadingSpinner from '@components/common/LoadingSpinner';

import CardSelector from '@features/GiftOrderPage/components/CardSelector';
import OrderButton from '@features/GiftOrderPage/components/OrderButton';
import ProductSummary from '@features/GiftOrderPage/components/ProductSummary';
import SenderForm from '@features/GiftOrderPage/components/SenderForm';
import ReceiveList from '@features/GiftOrderPage/components/ReceiveList';
import ReceiveModal from '@features/GiftOrderPage/components/ReceiveModal';

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider } from 'react-hook-form';
import styled from '@emotion/styled';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@contexts/AuthContext';

import useFetch from '@hooks/useFetch';
import useGiftOrderForm from './hooks/useGiftOrderForm';
import useReceiveModal from './hooks/useReceiveModal';
import useOrderSubmit from './hooks/useOrderSubmit';
import useOrderInvalid from './hooks/useOrderInvalid';
import type { ProductSummaryInfo } from './orderTypes';

const GiftOrderPage = () => {
  // 데이터 fetch
  const { id } = useParams();
  const {
    data: productInfo,
    loading,
    error,
  } = useFetch<ProductSummaryInfo>(`/products/${id}/summary`);

  //useForm 사용
  const methods = useGiftOrderForm();
  const { handleSubmit, setValue, watch } = methods;
  const onSubmit = useOrderSubmit(productInfo);
  const onInvalid = useOrderInvalid();

  //modal
  const { isReceiveModalOpen, openReceiveModal, closeReceiveModal } =
    useReceiveModal(watch, setValue);

  //초기화 로직
  const { user } = useAuth();
  useEffect(() => {
    if (user?.name) {
      setValue('sender', user.name);
    }
  }, [user?.name, setValue]);

  //에러 처리
  const navigate = useNavigate();
  useEffect(() => {
    if (error && axios.isAxiosError(error)) {
      const status = error.status;
      if (status && status >= 400 && status < 500) {
        toast.error(
          '데이터를 처리하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
          {
            autoClose: 2000,
            onClose: () => navigate('/'),
          }
        );
      }
    }
  }, [error, navigate]);

  // 로딩 처리
  if (loading) return <LoadingSpinner />;
  if (!productInfo)
    return <EmptyMessage>상품정보를 찾을 수 없습니다</EmptyMessage>;

  // 가격 계산
  const recipients = watch('recipients') ?? [];
  const totalQuantity = recipients.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );
  const totalPrice = productInfo.price * totalQuantity;

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <CardSelector />
          <Divider />
          <SenderForm />
          <Divider />
          <ReceiveList onOpen={openReceiveModal} />
          <Divider />
          <ProductSummary productInfo={productInfo} />
          <OrderButton price={totalPrice} />
        </form>
        {isReceiveModalOpen && <ReceiveModal onClose={closeReceiveModal} />}
      </FormProvider>
    </>
  );
};

export default GiftOrderPage;

const EmptyMessage = styled.div(({ theme }) => ({
  ...theme.typography.body1Regular,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '28.75rem',
}));
