import { useOrder } from '@/context/OrderContext';
import { useReceiver } from '@/context/ReceiverContext';
import { DefaultComponentDiv, EmptyDiv8h, OrderButton, Price, ProductBox, ProductImage, ProductInfo, ProductName, SideBlankDiv, SubText, SubTitle } from '@/styles/Common.styled'
import type { ProductItem } from '@/type/product';
import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';





const OrderCheck = () => {
  const navigate = useNavigate();
  const {
    senderNameInput,
    cardMessage,
  } = useOrder();

  const {
    receivers
  } =useReceiver();

  const location = useLocation();


  const handleOrder = () => {
    senderNameInput.validate();

    const isValid =
      !senderNameInput.error


    if (isValid) {
      alert(`주문이 완료되었습니다. 
        상품명:${item.name} 
        구매수량: ${productCount}
        발신자 이름: ${senderNameInput.value}
        메세지: ${cardMessage}
        `
      );
      navigate('/');
    }
  };


  const { item } = location.state as { item: ProductItem };


  const price = item.price.sellingPrice
  const imageUrl = item.imageURL
  const Name = item.name
  const brandName = item.brandInfo.name

  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const total  = receivers.reduce((acc,receiver) => acc + receiver.count, 0);
    setProductCount(total);
  },[receivers])
  return (
    <DefaultComponentDiv>
      <SideBlankDiv>
        <EmptyDiv8h />
        <SubTitle>상품 정보</SubTitle>
        <ProductBox>
          <ProductImage
            src={imageUrl}
            alt={Name}
          />
          
          <ProductInfo>
            <ProductName>{Name}</ProductName>
            <SubText>{brandName}</SubText>
            <Price>
              상품가 <span>{price}원</span>
            </Price>
          </ProductInfo>
        </ProductBox>

      </SideBlankDiv>

      <OrderButton onClick={handleOrder}> {Number(productCount) * price} 원 주문하기</OrderButton>
    </DefaultComponentDiv>
  );
};

export default OrderCheck;