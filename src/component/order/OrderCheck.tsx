import { useOrder } from '@/context/OrderContext';
import { useReceiver } from '@/context/ReceiverContext';
import useFetchFromUrl from '@/hook/useFetchFromUrl';
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
} from '@/styles/Common.styled';
import type { ProductItemSummary } from '@/type/product';
import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const OrderCheck = () => {
  const navigate = useNavigate();
  const { ordererName, message } = useOrder();

  const { receivers } = useReceiver();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get('id');

  const productUrl = `http://localhost:3000/api/products/${id}/summary`;
  const { item, error } = useFetchFromUrl<ProductItemSummary>(productUrl);
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

  const handleOrder = () => {
    ordererName.validate();

    if (!ordererName.error) {
      alert(`주문이 완료되었습니다. 
        상품명:${name} 
        구매수량: ${total}
        발신자 이름: ${ordererName.value}
        메세지: ${message}
        `);
      navigate('/');
    }
  };

  const total = receivers.reduce((acc, receiver) => acc + receiver.count, 0);

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
