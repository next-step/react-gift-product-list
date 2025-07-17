import Layout from "@/layout";
import { orderCardMockData } from "@/data/orderCardMockData";
import styled from "@emotion/styled";
import CardSelection from "./components/CardSelection/CardSelection";
import SenderSectionComponent from "./components/SenderSection/SenderSection";
import ReceiverSectionComponent from "./components/ReceiverSection/ReceiverSection";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import { useProductInfo } from "./hooks/useProductInfo";
import { useState } from "react";
import { useOrderForm } from "./hooks/useOrderForm";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { LoadingContainer } from "../HomePage/components/Category/Category.styles";
import { useOrderSubmit } from "./hooks/useOrderSubmit";

const OrderPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.disabled};
  gap: ${({ theme }) => theme.spacing[2]};
`;

function OrderPage() {
  const [isSubmittedOnce, setIsSubmittedOnce] = useState(false);
  const { product, loading } = useProductInfo();

  const {
    messageCard,
    setMessageCard,
    cardSelectionControl,
    cardSelectionErrors,

    senderControl,
    senderErrors,

    receivers,
    setReceivers,

    validateAllForms,
    getFormValues,
  } = useOrderForm({ isSubmittedOnce });

  const { onSubmitHandler } = useOrderSubmit({
    validateAllForms,
    setIsSubmittedOnce,
    getFormValues,
    receivers,
    messageCard,
    product,
  });

  if (loading) {
    return (
      <Layout>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </Layout>
    );
  }

  if (loading || !product) {
    return null;
  }

  const totalQuantity = receivers.reduce(
    (acc, cur) => acc + Number(cur.quantity),
    0
  );

  return (
    <Layout>
      <form onSubmit={onSubmitHandler}>
        <OrderPageContainer>
          <CardSelection
            cards={orderCardMockData}
            control={cardSelectionControl}
            errors={cardSelectionErrors}
            messageCard={messageCard}
            setMessageCard={setMessageCard}
          />
          <SenderSectionComponent
            control={senderControl}
            errors={senderErrors}
          />
          <ReceiverSectionComponent
            receivers={receivers}
            setReceivers={setReceivers}
          />
          <ProductInfo product={product} quantity={totalQuantity.toString()} />
        </OrderPageContainer>
      </form>
    </Layout>
  );
}

export default OrderPage;
