import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';

import MobileLayout from '@/layouts/MobileLayout';
import NavBar from '@/components/NavBar';
import CardPicker from '@/components/order/CardPicker';
import CardMessage from '@/components/order/CardMessage';
import SenderInfo from '@/components/order/SenderInfo';
import ReceiverInfo from '@/components/order/ReceiverInfo';
import ProductInfo from '@/components/order/ProductInfo';
import OrderButton from '@/components/order/OrderButton';

import { useProductSummary } from '@/hooks/useProductSummary';
import { useAuth } from '@/hooks/useAuth';
import { isBlank } from '@/utils/validation';
import { cardTemplates } from '@/mock/cardTemplates';
import type { Receiver } from '@/types/order';
import { createOrder } from '@/api/order';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: ${({ theme }) => theme.colors.gray[200]};
`;

interface FormValues {
  message: string;
  sender: string;
  name: string;
  phone: string;
  qty: number;
}

export default function OrderPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { product, loading } = useProductSummary(id);
  const defaultTpl = cardTemplates[0];
  const [receivers, setReceivers] = useState<Receiver[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      message: defaultTpl.defaultTextMessage,
      sender: '',
      name: '',
      phone: '',
      qty: 1,
    },
  });

  useEffect(() => {
    if (user?.name) {
      setValue('sender', user.name);
    }
  }, [user, setValue]);

  if (loading) return <div>로딩 중...</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  const onSubmit = async (data: FormValues) => {
    if (receivers.length === 0) {
      toast.error('받는 사람을 한 명 이상 등록해주세요.');
      return;
    }

    try {
      await createOrder(
        {
          productId: product.id,
          message: data.message,
          messageCardId: defaultTpl.id.toString(),
          ordererName: data.sender,
          receivers: receivers.map((r) => ({
            name: r.name,
            phoneNumber: r.phone,
            quantity: r.qty,
          })),
        },
        user?.authToken ?? '',
      );

      toast.success(
        <div>
          주문이 완료되었습니다.
          <br />
          상품명: {product.name}
          <br />
          구매 수량: {totalQty}
          <br />
          발신자 이름: {data.sender}
          <br />
          메시지: {data.message || '(없음)'}
        </div>,
      );
      navigate('/');
    } catch (err: any) {
      if (err.message === '401') {
        toast.error('로그인이 필요합니다.');
        navigate('/login');
      } else {
        toast.error(err.message);
      }
    }
  };

  const totalQty = receivers.reduce((sum, r) => sum + r.qty, 0);

  return (
    <MobileLayout>
      <Wrapper>
        <NavBar />

        {/* 카드 선택 */}
        <CardPicker
          selectedId={defaultTpl.id}
          onSelect={(tpl) => setValue('message', tpl.defaultTextMessage)}
        />
        {/* 카드 + 메세지 */}
        <CardMessage
          tpl={defaultTpl}
          register={register('message', {
            validate: (v) => !isBlank(v) || '메시지를 입력해주세요.',
          })}
          error={errors.message?.message}
        />

        {/* 보내는 사람 */}
        <SenderInfo
          register={register('sender', {
            validate: (v) => !isBlank(v) || '이름을 입력해주세요.',
          })}
          error={errors.sender?.message}
        />

        {/* 받는 사람 */}
        <ReceiverInfo receivers={receivers} setReceivers={setReceivers} />

        {/* 상품 정보 */}
        <ProductInfo product={product} />

        {/* 주문하기 버튼 */}
        <OrderButton priceSum={product.price} qty={totalQty} onClick={handleSubmit(onSubmit)} />
      </Wrapper>
    </MobileLayout>
  );
}
