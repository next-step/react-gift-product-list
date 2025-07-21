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
const fetchProductSummary = (product_id:number) => {
  return axios
    .get(`http://localhost:3000/api/products/${product_id}/summary`)
    .then((res) => res.data.data);
};

const fetchOrder = async(body, token) => {
  return axios
    .post(`http://localhost:3000/api/order`, body, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);
}

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
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
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
  
  const { data, isLoading } = useFetch({
    fetcher: () => fetchProductSummary(product_id),
    initValue: null,
    deps:[productId]
  });

  const {
    data: orderData,
    isLoading: isOrderPosting,
    error: orderError,
    post,
  } = usePost({ fetcher: (body, token) => fetchOrder(body, token) });

  console.log('orderData', orderData);  
  console.log('orderError', orderError);



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

  const handleClickOrderBtn = handleSubmit((formData) => {
    const body = {
      productId: product_id,
      message: formData.cardMessage,
      messageCardId: selectedCard?.id,
      ordererName: formData.senderName,
      receivers: formData.receivers,
    };
console.log('formData', formData);
console.log('body', body);

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
if (isLoading) return <div>로딩중...(fetch 중)</div>;
if (!data) return <div>로딩중...(data 없음)</div>;
if (!user?.name) return <div>로딩중...(user name 없음)</div>;
  // -------------------- ✅ 가격 계산 --------------------
  const productPrice = data.price;
  const receiversTotalQuantity = receivers.reduce((sum, r) => sum + r.quantity, 0);
  const totalPrice = productPrice * receiversTotalQuantity;

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
