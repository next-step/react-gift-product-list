import Divider from '@components/common/Divider';
import CardSelector from '@features/GiftOrderPage/components/CardSelector';
import OrderButton from '@features/GiftOrderPage/components/OrderButton';
import ProductSummary from '@features/GiftOrderPage/components/ProductSummary';
import SenderForm from '@features/GiftOrderPage/components/SenderForm';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type MultiOrderFormData,
  multiOrderSchema,
} from '@schemas/orderSchema';
import cardTemplate from '@data/cardTemplate.json';

import {
  FormProvider,
  useForm,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form';
import ReceiveList from '@features/GiftOrderPage/components/ReceiveList';
import ReceiveModal from '@features/GiftOrderPage/components/ReceiveModal';
import { useModal } from '@contexts/ModalContext';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '@hooks/useFetch';
import LoadingSpinner from '@components/common/LoadingSpinner';
import styled from '@emotion/styled';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@contexts/AuthContext';
import axiosInstance from '@apis/axiosInstance';

export interface FormSectionProps {
  register: UseFormRegister<MultiOrderFormData>;
  errors: FieldErrors<MultiOrderFormData>;
  setValue?: UseFormSetValue<MultiOrderFormData>;
}

export interface ProductSummaryInfo {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

const GiftOrderPage = () => {
  //useForm 사용
  const methods = useForm<MultiOrderFormData>({
    resolver: zodResolver(multiOrderSchema),
    mode: 'onChange',
    defaultValues: {
      messageCardId: cardTemplate[0].id.toString(),
      message: cardTemplate[0].defaultTextMessage,
      sender: '',
      recipients: [],
    },
  });
  const { handleSubmit, setValue, watch } = methods;

  const onSubmit = async (formData: MultiOrderFormData) => {
    const { message, sender, recipients, messageCardId } = formData;

    const requestBody = {
      productId: productInfo?.id,
      message,
      messageCardId,
      ordererName: sender,
      receivers: recipients.map((r) => ({
        name: r.receiver,
        phoneNumber: r.phone,
        quantity: r.quantity,
      })),
    };

    try {
      const res = await axiosInstance.post('/order', requestBody, {
        headers: {
          Authorization: user?.authToken,
        },
      });
      const data = res.data.data;
      console.log(data);

      if (data.success) {
        toast.success('주문 완료', {
          autoClose: 2000,
          onClose: () => navigate('/'),
        });
      }
    } catch (error) {
      console.error('에러 발생 :', error);
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response?.status;
        const errorMessage =
          error.response.data?.data?.message ||
          '알 수 없는 에러가 발생했습니다.';
        console.log(errorMessage);

        if (statusCode == 401) {
          toast.error(errorMessage, {
            autoClose: 1000,
            onClose: () => navigate('/login'),
          });
          return;
        }

        if (statusCode >= 400 && statusCode < 500) {
          toast.error(errorMessage);
        } else {
          toast.error('서버 오류 또는 네트워크 문제 발생');
        }
      } else {
        toast.error('예상치 못한 오류가 발생했습니다.');
      }
    }
  };

  const onInvalid = (errors: FieldErrors<MultiOrderFormData>) => {
    if (errors.recipients) {
      if ('message' in errors.recipients) {
        alert(errors.recipients.message);
      } else if (
        'root' in errors.recipients &&
        errors.recipients.root?.message
      ) {
        alert(errors.recipients.root.message);
      }
    }
  };

  //modal에서 recipients 관리
  const [prevRecipients, setPrevRecipients] = useState<
    MultiOrderFormData['recipients']
  >([]);
  const {
    isReceiveModalOpen,
    openReceiveModal: openModal,
    closeReceiveModal: closeModal,
  } = useModal();

  const openReceiveModal = () => {
    const currentRecipients = watch('recipients') ?? [];
    const deepCopied = JSON.parse(JSON.stringify(currentRecipients));
    setPrevRecipients(deepCopied);
    openModal();
  };

  const closeReceiveModal = () => {
    setValue('recipients', prevRecipients);
    closeModal();
  };

  // 데이터 fetch
  const { id } = useParams();
  const {
    data: productInfo,
    loading,
    error,
  } = useFetch<ProductSummaryInfo>(`/products/${id}/summary`);

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

  //초기화 로직
  const { user } = useAuth();
  useEffect(() => {
    if (user?.name) {
      setValue('sender', user.name);
    }
  }, [user?.name, setValue]);

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
