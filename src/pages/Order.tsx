import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

import Navbar from '@/components/navbar/Navbar';
import { PaddingLg, PaddingSm, PaddingGraySm, PaddingMd } from '../components/common/Padding';
import CardMessage from '@/components/common/cardmessage/CardMessage';
import SenderForm from '@/components/order/senderform/SenderForm';
import ProductInfo from '@/components/order/ProductInfo';
import OrderBtn from '@/components/order/OrderBtn';
import CardSelector from '@/components/order/CardSelector';
import ReceiverModal from '@/components/order/receivermodal/ReceiverModal';
import ReceiverList from '@/components/order/receiverlist/ReceiverList';

import { useFetch } from '@/hooks/useFetch';
import usePost from '@/hooks/usePost';
import { useAuth } from '@/contexts/AuthContext';
import type { OrderFormData } from '@/components/order/receiverlist/types';
import { ROUTE_PATH } from '@/routes/Router';

type SelectedCard = {
  id: number;
  message: string;
};

const Order = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { productId } = useParams();
  const product_id = Number(productId);

  // -------------------- ✅ 상태 선언 --------------------
  const [selectedCard, setSelectedCard] = useState<SelectedCard>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // -------------------- ✅ 폼 관련 --------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    setValue,
  } = useForm<OrderFormData>({
    defaultValues: {
      senderName: '',
      cardMessage: '',
      receivers: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'receivers',
  });

  const receivers = watch('receivers');

  // -------------------- ✅ 데이터 패칭 --------------------
  const fetchProductSummary = useCallback(() => {
    return axios
      .get(`http://localhost:3000/api/products/${product_id}/summary`)
      .then((res) => res.data.data);
  }, [product_id]);

  const fetchOrder = useCallback((body, token) => {
    return axios
      .post(`http://localhost:3000/api/order`, body, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data);
  }, []);

  const { data, isLoading } = useFetch({
    fetcher: fetchProductSummary,
    initValue: null,
  });

  const {
    data: orderData,
    isLoading: isOrderPosting,
    error: orderError,
    post,
  } = usePost({ fetcher: fetchOrder });

  // -------------------- ✅ useEffect --------------------
  useEffect(() => {
    if (user?.name) {
      reset((prev) => ({
        ...prev,
        senderName: user.name,
      }));
    }
  }, [user, reset]);

  useEffect(() => {
    if (selectedCard?.message) {
      setValue('cardMessage', selectedCard.message);
    }
  }, [selectedCard, setValue]);

  // -------------------- ✅ 핸들러 --------------------
  const handleClickOrderBtn = handleSubmit((formData) => {
    const body = {
      productId: product_id,
      message: formData.cardMessage,
      messageCardId: selectedCard?.id,
      ordererName: formData.senderName,
      receivers: formData.receivers,
    };

    post(body, user.token)
      .then((res) => {
        toast.success('주문이 완료되었습니다!');
      })
      .catch((e) => {
        if (e.response?.status === 401) {
          toast.error('로그인이 필요합니다.');
          navigate(ROUTE_PATH.LOGIN); // ✅ 로그인 페이지로 이동
        } else {
          toast.error(e.message || '주문 중 오류가 발생했습니다.');
        }
      });
  });
  // -------------------- ✅ 렌더링 조건 --------------------
  if (isLoading || !data || !user?.name) return <div>로딩중...</div>;

  // -------------------- ✅ 가격 계산 --------------------
  const productPrice = data.price;
  const receiversTotalQuantity = receivers.reduce((sum, r) => sum + r.quantity, 0);
  const totalPrice = productPrice * receiversTotalQuantity;

  // -------------------- ✅ UI 렌더링 --------------------
  return (
    <div>
      <Navbar />
      <PaddingSm />
      <CardSelector setSelectedCard={setSelectedCard} />
      <PaddingLg />
      <CardMessage register={register} error={errors.cardMessage?.message} />
      <PaddingMd />
      <PaddingGraySm />
      <SenderForm register={register} error={errors.senderName?.message} />
      <PaddingGraySm />
      <ReceiverList fields={fields} receivers={receivers} setIsVisible={setIsModalVisible} />
      <PaddingGraySm />
      <ProductInfo product={data} />
      <OrderBtn totalPrice={totalPrice} onClick={handleClickOrderBtn} />

      {isModalVisible && (
        <ReceiverModal
          setIsVisible={setIsModalVisible}
          handleSubmit={handleSubmit}
          register={register}
          control={control}
          error={errors.receivers}
        />
      )}
    </div>
  );
};

export default Order;
