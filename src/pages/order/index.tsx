import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";
import MessageCard, {
  type MessageCardHandle,
} from "@/pages/order/components/MessageCard";
import SenderInfo, {
  type SenderInfoHandle,
} from "@/pages/order/components/SenderInfo";
import ReceiverListSection, {
  type Receiver,
} from "@/pages/order/components/ReceiverListSection";
import ProductInfo from "@/pages/order/components/ProductInfo";
import OrderFooter from "@/pages/order/components/OrderFooter";

import { useNavigate, useParams } from "react-router-dom";
import { validateReceiverCount } from "@/utils/validators";
import { ERROR_MESSAGES } from "@/constants/messages";
import { useProductSummary } from "@/hooks/useProductSummary";
import { useAuth } from "@/hooks/useAuth";

import { toast } from "react-toastify";

export default function OrderPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const id = Number(productId);
  const { product, loading, error } = useProductSummary(id);
  const { user } = useAuth();

  const messageCardRef = useRef<MessageCardHandle>(null);
  const senderInfoRef = useRef<SenderInfoHandle>(null);

  const [receivers, setReceivers] = useState<Receiver[]>([]);
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState(user?.name ?? "");

  const totalQuantity = receivers.reduce(
    (sum, receiver) => sum + receiver.quantity,
    0,
  );

  const totalPrice = product?.price ? product.price * totalQuantity : 0;

  const handleOrderClick = () => {
    const isMessageValid = messageCardRef.current?.validate() ?? false;
    const isSenderValid = senderInfoRef.current?.validate() ?? false;

    if (!isMessageValid || !isSenderValid) return;

    const receiverError = validateReceiverCount(receivers.length);
    if (receiverError) {
      toast.error(receiverError);
      return;
    }

    const alertMessage = [
      `주문이 완료되었습니다.`,
      `상품명: ${product?.name}`,
      `구매 수량: ${receivers.length}`,
      `발신자 이름: ${senderName}`,
      `메시지: ${message}`,
    ].join("\n");

    window.alert(alertMessage.trim());
    navigate("/");
  };

  const handleReceiverChange = useCallback((newReceivers: Receiver[]) => {
    setReceivers(newReceivers);
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(ERROR_MESSAGES.PRODUCT.FAIL_TO_LOAD);
      navigate("/");
    }
  }, [error, navigate]);

  if (loading) {
    return <Placeholder>{ERROR_MESSAGES.PRODUCT.LOAD}</Placeholder>;
  }
  if (!product) {
    return <Placeholder>{ERROR_MESSAGES.PRODUCT.FAIL_TO_LOAD}</Placeholder>;
  }

  return (
    <>
      <MessageCard
        ref={messageCardRef}
        onMessageChange={(msg) => setMessage(msg)}
      />
      <SectionDivider />
      <SenderInfo
        ref={senderInfoRef}
        onChange={(name) => setSenderName(name)}
      />
      <SectionDivider />
      <ReceiverListSection onChange={handleReceiverChange} />
      <SectionDivider />
      <ProductInfo
        name={product.name}
        imageUrl={product.imageURL}
        brand={product.brandName}
        price={product.price}
      />
      <OrderFooter totalPrice={totalPrice} onClick={handleOrderClick} />
    </>
  );
}

const SectionDivider = styled.div`
  height: 12px;
  background-color: ${({ theme }) => theme.colors.semantic.background.disabled};
`;

const Placeholder = styled.div`
  text-align: center;
  padding: 40px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.semantic.text.disabled};
`;
