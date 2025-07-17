import { FormProvider } from 'react-hook-form';
import NavigationBar from '@/common/NavigationBar';
import GiftCardSelector from '@/components/ProductOrder/GiftCardSelector';
import SenderInfoSection from '@/components/ProductOrder/SenderInfoSection';
import ReceiverInfoSection from '@/components/ProductOrder/ReceiverInfo/ReceiverInfoSection';
import ProductInfo from '@/components/giftHome/GiftThemes/ProductInfo';
import OrderBtn from '@/components/ProductOrder/OrderBtn';
import styled from '@emotion/styled';
import { useOrderForm } from '@/hooks/useOrderForm';

const ProductOrder = () => {
  const { imageURL, name, price, brandInfo, methods, handleSubmit } =
    useOrderForm();

  return (
    <FormProvider {...methods}>
      <Layout>
        <Content>
          <NavigationBar />
          <GiftCardSelector />
          <SenderInfoSection />
          <ReceiverInfoSection />
          <ProductInfo
            imageURL={imageURL}
            name={name}
            price={price}
            brandInfo={brandInfo}
          />
          <OrderBtn price={price.basicPrice} onClick={handleSubmit} />
        </Content>
      </Layout>
    </FormProvider>
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
