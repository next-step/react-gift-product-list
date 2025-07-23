import { BaseUrl } from '@/constant/api';
import { useAuth } from '@/context/AuthContext';
import { useOrder } from '@/context/OrderContext';
import { useReceiver } from '@/context/ReceiverContext';
import useFetchFromUrlT from '@/hook/useFetchFromUrlT';
import {
  DefaultComponentDiv,
  EmptyDiv8h,
  OrderButton,
  Price,
  ProductBox,
  ProductImage,
  ProductInfo,
  ProductName,
  SideBlankDiv,
  SubText,
  SubTitle,
} from '@/styles/CommomStyle/Common.styled';
import { defaultProductItemSummary, type ProductItemSummary } from '@/type/GiftAPI/product';
import { orderAPI } from '@/utils/orderApi';
import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const OrderCheck = () => {
  const { ordererName, message, messageCardId } = useOrder();
  const { receivers } = useReceiver();
  const { user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const idParam = query.get('id');
  const id = idParam !== null ? Number(idParam) : null;

  const productUrl = `${BaseUrl}/api/products/${id}/summary`;
  const { item, error } = useFetchFromUrlT<ProductItemSummary>(productUrl,defaultProductItemSummary);


  useEffect(() => {
    if (error) {
      toast.error((error as Error).message);
      navigate('/');
    }
  }, [error, navigate]);

  const price = item?.price;
  const imageUrl = item?.imageURL;
  const name = item?.name;
  const brandName = item?.brandName;


  const handleOrder = async () => {
    ordererName.validate();

    if (!ordererName.error) {
      try {
        await orderAPI(
          (id ?? 0),
          message,
          messageCardId,
          ordererName.value,
          receivers,
          (user?.authToken ?? '')
        )
        alert(`주문이 완료되었습니다. 
        상품명:${name} 
        구매수량: ${total}
        발신자 이름: ${ordererName.value}
        메세지: ${message}
        `);
        navigate('/');
      } catch (error) {
        navigate('/login');
        throw new Error(`${(error as Error).message}`);
      }
    }
  };

  const total = receivers.reduce((acc, receiver) => acc + receiver.quantity, 0);

  return (
    <DefaultComponentDiv>
      <ToastContainer />
      <SideBlankDiv>
        <EmptyDiv8h />
        <SubTitle>상품 정보</SubTitle>
        <ProductBox>
          <ProductImage src={imageUrl} alt={name} />

          <ProductInfo>
            <ProductName>{name}</ProductName>
            <SubText>{brandName}</SubText>
            <Price>
              상품가 <span>{price}원</span>
            </Price>
          </ProductInfo>
        </ProductBox>
      </SideBlankDiv>

      <OrderButton onClick={handleOrder}>
        {' '}
        {Number(total) * (price ?? 0)} 원 주문하기
      </OrderButton>
    </DefaultComponentDiv>
  );
};

export default OrderCheck;
