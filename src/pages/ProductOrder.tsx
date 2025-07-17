import { FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import NavigationBar from '@/common/NavigationBar';
import GiftCardSelector from '@/components/ProductOrder/GiftCardSelector';
import SenderInfoSection from '@/components/ProductOrder/SenderInfoSection';
import ReceiverInfoSection from '@/components/ProductOrder/ReceiverInfo/ReceiverInfoSection';
import ProductInfo from '@/components/giftHome/GiftThemes/ProductInfo';
import OrderBtn from '@/components/ProductOrder/OrderBtn';
import styled from '@emotion/styled';
import { useOrderForm } from '@/hooks/useOrderForm';
import { useState } from 'react';

const ProductOrder = () => {
  const { productId } = useParams();
  const { imageURL, name, price, brandInfo, methods, handleSubmit, order } =
    useOrderForm(Number(productId));

  const [message, setMessage] = useState('생일 축하해!');
  const [messageCardId, setMessageCardId] = useState('default-card');

  return (
    <>
      <NavigationBar />
      <FormProvider {...methods}>
        <Layout>
          <Content>
            <ProductInfo
              imageURL={imageURL}
              name={name}
              price={price}
              brandInfo={brandInfo}
            />
            <GiftCardSelector
              message={message}
              setMessage={setMessage}
              messageCardId={messageCardId}
              setMessageCardId={setMessageCardId}
            />
            <SenderInfoSection />
            <ReceiverInfoSection />
          </Content>
          <OrderBtn
            price={price.basicPrice}
            onClick={handleSubmit(() => order({ message, messageCardId }))}
          />
        </Layout>
      </FormProvider>
    </>
  );
};

export default ProductOrder;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 44px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  gap: 24px;
`;

const Content = styled.div`
  width: 100%;
  max-width: 720px;
  padding: 0 16px;
`;
