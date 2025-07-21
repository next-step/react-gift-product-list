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
import { useProductSummary } from '@/hooks/useProductSummary';

const ProductOrder = () => {
  const { productId } = useParams();
  const product = useProductSummary(Number(productId));

  const { methods, handleSubmit, order } = useOrderForm(Number(productId));

  const [message, setMessage] = useState('생일 축하해!');
  const [messageCardId, setMessageCardId] = useState('default-card');

  if (!product) return <div>상품 정보를 불러오는 중입니다...</div>;

  return (
    <>
      <NavigationBar />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(() => order({ message, messageCardId }))}>
          <Layout>
            <Content>
              <ProductInfo
                imageURL={product.imageURL}
                name={product.name}
                price={{ basicPrice: product.price }}
                brandInfo={{ name: product.brandName }}
              />
              <GiftCardSelector
                message={message}
                onChangeMessage={setMessage}
                messageCardId={messageCardId}
                onChangeMessageCardId={setMessageCardId}
              />
              <SenderInfoSection />
              <ReceiverInfoSection />
            </Content>

            <StickyWrapper>
              <OrderBtn
                price={product.price}
                onClick={handleSubmit(() => order({ message, messageCardId }))}
              />
            </StickyWrapper>
          </Layout>
        </form>
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
  min-height: 100vh;
  gap: 24px;
`;

const Content = styled.div`
  width: 100%;
  max-width: 720px;
  padding: 0 16px;
`;

const StickyWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 720px;
  height: 56px;
  z-index: 100;
  background: white;
`;
