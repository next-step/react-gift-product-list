import { LoadingSpinner } from "@/components/common";
import {
  CardSelectorBar,
  OrderButton,
  OrderLayout,
  OrderProductInfoSection,
  ReceiverInfoSection,
  SelectedCardView,
  SenderInfoSection,
} from "@/components/order";
import { OrderProvider } from "@/contexts/order/OrderProvider";
import { OverlayProvider } from "@/contexts/overlay/OverlayProvider";
import { useOrderPageLogic } from "@/hooks/order/useOrderPageLogic";
import styled from "@emotion/styled";

const BlankSpace = styled.div(({ theme }) => ({
  display: "flex",
  width: "100%",
  padding: theme.spacing1,
  backgroundColor: theme.color.gray[100],
}));

const OrderPageContent = () => {
  const { order, handleOrderSubmit, isLoading } = useOrderPageLogic();

  if (isLoading) return <LoadingSpinner />;

  return (
    <OverlayProvider>
      <OrderLayout>
        <CardSelectorBar />
        <SelectedCardView />
        <BlankSpace />
        <SenderInfoSection />
        <BlankSpace />
        <ReceiverInfoSection />
        <BlankSpace />
        <OrderProductInfoSection product={order.product} />
        <OrderButton onClick={handleOrderSubmit} />
      </OrderLayout>
    </OverlayProvider>
  );
};

export const OrderPage = () => {
  return (
    <OrderProvider>
      <OrderPageContent />
    </OrderProvider>
  );
};
