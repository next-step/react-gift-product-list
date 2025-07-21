import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray, useWatch, type SubmitHandler } from 'react-hook-form';
import { Layout } from '@/components/Layout';
import { NavBar } from '@/components/NavBar';
import type { MessageCard } from '@/types';
import { rankingAll } from '@/data/rankings';
import { messageCardTemplates } from '@/data/messageCards';
import { toastError, toastSuccess } from '@/utils/toast';
import axios from 'axios';
import { getProductSummary, createOrder } from '@/api/services';
import { useFetch } from '@/hooks/useFetch';
import { useAuth } from '@/contexts/AuthContext';

import * as S from '@/styles/OrderPage.styles';
import { MessageCardSection } from '@/components/order/MessageCardSection';
import { ProductInfoSection } from '@/components/order/ProductInfoSection';
import { OrderPageFooter } from '@/components/order/OrderPageFooter';
import { GiftingForm } from '@/components/order/GiftingForm';
import { AddRecipientModal } from '@/components/order/AddRecipientModal';
import { RecipientList } from '@/components/order/RecipientList';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderFormSchema, type OrderFormValues } from '@/lib/schemas';

const OrderPage = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const { data: item, isLoading, error } = useFetch(() => getProductSummary(itemId!), [itemId]);
  useEffect(() => {
    if (error) {
      toastError('상품 정보를 불러오는 데 실패했습니다.');
      navigate('/');
    }
  }, [error, navigate]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      senderName: '내 이름',
      message: messageCardTemplates[0].defaultTextMessage,
      selectedCardId: messageCardTemplates[0].id,
      recipients: [],
    },
  });

  const { fields, remove } = useFieldArray({ control, name: 'recipients' });

  const recipients = useWatch({ control, name: 'recipients' });
  const messageValue = useWatch({ control, name: 'message' });
  const selectedCardId = useWatch({ control, name: 'selectedCardId' });
  
  const handleCardSelect = (card: MessageCard) => {
    setValue('selectedCardId', card.id);
    setValue('message', card.defaultTextMessage);
  };
  const selectedCard = messageCardTemplates.find(card => card.id === selectedCardId) || messageCardTemplates[0];

  const handleRecipientsUpdate = (updatedRecipients: OrderFormValues['recipients']) => {
    setValue('recipients', updatedRecipients, { shouldValidate: true });
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<OrderFormValues> = async (data) => {
    const orderData = {
      productId: Number(itemId),
      message: data.message,
      messageCardId: selectedCard.id.toString(),
      ordererName: data.senderName,
      receivers: data.recipients.map(r => ({ name: r.name, phoneNumber: r.phone, quantity: r.quantity })),
    };
    try {
      await createOrder(orderData);
      toastSuccess('주문이 성공적으로 완료되었습니다!');
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toastError('로그인이 필요합니다.');
        navigate('/login');
      } else {
        toastError('주문 처리 중 오류가 발생했습니다.');
        console.error(err);
      }
    }
  };

  if (isLoading || !item) {
    return (
      <Layout>
        <NavBar />
        <div css={S.pageWrapper}>상품 정보를 찾을 수 없습니다.</div>
      </Layout>
    );
  }

  const totalPrice = (recipients || []).reduce((sum, current) => sum + (item.price * current.quantity), 0);

  return (
    <Layout>
      <NavBar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div css={S.pageWrapper}>
          <MessageCardSection
            selectedCard={selectedCard}
            onCardSelect={handleCardSelect}
            message={messageValue || ''}
            onMessageChange={(e) => setValue('message', e.target.value, { shouldValidate: true })}
          />
          <hr css={S.divider} />
          <div css={{ padding: `0 16px` }}>
            <GiftingForm register={register} errors={errors} />
            <p css={S.helperTextCss}>* 실제 선물 발송 시 발신자이름으로 반영되는 정보입니다.</p>
            {errors.senderName && <p css={S.errorCss}>{errors.senderName.message}</p>}
          </div>
          <hr css={S.divider} />
          <div css={S.formSection}>
            <h3>받는 사람</h3>
            <RecipientList control={control} remove={remove} />
            <button type="button" onClick={() => setIsModalOpen(true)}>
              {fields.length > 0 ? '수정하기' : '+ 추가하기'}
            </button>
            {errors.recipients && <p css={S.errorCss}>{errors.recipients.message}</p>}
          </div>
          <hr css={S.divider} />
          <ProductInfoSection item={item} />
        </div>
        <OrderPageFooter totalPrice={totalPrice} />

      </form>
      {isModalOpen && (
        <AddRecipientModal
          onClose={() => setIsModalOpen(false)}
          onComplete={handleRecipientsUpdate}
          initialRecipients={recipients}
        />
      )}
    </Layout>
  );
};

export default OrderPage;
