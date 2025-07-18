import Navbar from '@/components/navbar/Navbar';
import { PaddingLg, PaddingSm, PaddingGraySm, PaddingMd } from '../components/common/Padding';
import CardMessage from '@/components/common/cardmessage/CardMessage';
import SenderForm from '@/components/order/senderform/SenderForm';
import ProductInfo from '@/components/order/ProductInfo';
import OrderBtn from '@/components/order/OrderBtn';
import { useParams } from 'react-router-dom';
import CardSelector from '@/components/order/CardSelector';
import ReceiverModal from '@/components/order/receivermodal/ReceiverModal';
import { useFieldArray, useForm } from 'react-hook-form';
import type { OrderFormData } from '@/components/order/receiverlist/types';
import ReceiverList from '@/components/order/receiverlist/ReceiverList';
import { useCallback, useEffect, useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import usePost from '@/hooks/usePost';
type selectedCardType = {
  id: number;
  message: string;
};
const Order = () => {
  const { user, setUser } = useAuth();
  const { productId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, //control: useFieldArray, useController 등 advanced 기능을 쓸 때 필요한 핵심 객체!
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
  const receivers = watch('receivers');
  const { fields } = useFieldArray({
    control,
    name: "receivers",
  });
  useEffect(() => {
    if (user?.name) {
      reset((prev) => ({
        ...prev,
        senderName: user.name,
      }));
    }
  }, [user, reset]);
 
  const [selectedCard, setSelectedCard] = useState<selectedCardType>();
  const [isModalVisible, setIsModalVisible] = useState(false);
   useEffect(() => {
     if (selectedCard?.message) {
       setValue('cardMessage', selectedCard.message);
     }
   }, [selectedCard, setValue]);

  const product_id = Number(productId);
  console.log(productId);
  const fetchProductSummary = useCallback(() => {
    console.log('axios 하기 ');
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
  const { data, isLoading, error } = useFetch<ProductSummary>({
    fetcher: fetchProductSummary,
    initValue: null,
  });
  const {
    data: orderData,
    isLoading: isOrderPosting,
    error: orderError,
    post,
  } = usePost({ fetcher: fetchOrder });

  if (isLoading || !data || !user.name) return <div>로딩중...</div>;

  console.log(orderData, isOrderPosting, orderError, post);
  console.log(data);
  const productPrice = data.price;
  console.log(productPrice);

  const receiversTotalQuantity = receivers.reduce((sum, receiver) => sum + receiver.quantity, 0);
  const totalPrice = productPrice * receiversTotalQuantity;
  const handleClickOrderBtn = handleSubmit((formData) => {
    const body = {
      productId: Number(productId),
      message: formData.cardMessage,
      messageCardId: selectedCard.id,
      ordererName: formData.senderName,
      receivers: formData.receivers,
    };
    console.log('주문하기 post 보내기 일보직전!', body);
    post(body, user.token)
      .then((res) => alert(res))
      .catch((e) => {
        alert(e.message);
      });
  });

  return (
    <div>
      <Navbar />
      <PaddingSm />
      <CardSelector setSelectedCard={setSelectedCard} />
      <PaddingLg />
      <CardMessage
         register={register}
        error={errors.cardMessage?.message}
      />
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
