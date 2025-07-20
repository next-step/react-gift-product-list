import styled from "@emotion/styled";
import GiftCardSelector from "@/components/order/GiftCardSelector";
import SenderForm from "@/components/order/SenderForm";
import ReceiverForm from "@/components/order/ReceiverForm";
import GiftInfo from "@/components/order/GiftInfo";
import { useNavigate, useParams } from "react-router-dom";
import useOrderForm from "../components/order/useOrderForm";
import { useEffect, useState } from "react";
import type { Receiver } from "@/types/order";
import { orderProduct, productSummary } from "@/services/order";
import { showErrorToast } from "@/styles/toast";
import { STORAGE_KEY } from "@/constants/storage";
import type { Product } from "@/types/product";
import axios from "axios";

export default function OrderPage() {
  const navigate = useNavigate();
  const { itemId } = useParams();

  const message = useOrderForm();
  const sender = useOrderForm();
  const [receiverList, setReceiverList] = useState<Receiver[]>([]);

  const [product, setProduct] = useState<{ data: Product } | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!itemId) return;
        const data = await productSummary(itemId);
        setProduct(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          showErrorToast("상품 정보를 불러올 수 없습니다.");
          navigate("/gift", { replace: true });
        }
      }
    };

    fetchProduct();
  }, [itemId, navigate]);

  useEffect(() => {
    const userInfo = sessionStorage.getItem(STORAGE_KEY.USER_INFO);
    if (!userInfo) return;

    const user = JSON.parse(userInfo);
    const name = user.name || "";
    console.log("로그인 유저 이름:", name);
    sender.setValue(name);
  }, []);

  const totalQuantity = receiverList.reduce(
    (sum, receiver) => sum + Number(receiver.quantity),
    0
  );

  if (!product) return null;
  const totalPrice = product.data.price * totalQuantity;

  const handleOrder = async () => {
    const isMessageValid = message.validate();
    const isSenderValid = sender.validate();
    const isQuantityValid = receiverList.length > 0;

    if (!isMessageValid || !isSenderValid) {
      return;
    }

    if (!isQuantityValid) {
      showErrorToast("받는 사람이 없습니다");
      return;
    }

    try {
      const userInfo = sessionStorage.getItem(STORAGE_KEY.USER_INFO);
      if (!userInfo) {
        navigate("/login");
        return;
      }

      const user = JSON.parse(userInfo);
      const authToken = user.authToken;

      if (!authToken) {
        showErrorToast("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      await orderProduct(
        {
          productId: Number(itemId),
          message: message.value,
          messageCardId: "default-card",
          ordererName: sender.value,
          receivers: receiverList.map((r) => ({
            name: r.name,
            phoneNumber: r.phone,
            quantity: r.quantity,
          })),
        },
        authToken
      );

      alert(`주문이 완료되었습니다.
상품명: ${product.data.name}
총 구매 수량: ${totalQuantity}
받는 사람 수: ${receiverList.length}명
발신자 이름: ${sender.value}
메시지: ${message.value}`);

      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          showErrorToast("로그인이 필요합니다.");
          navigate("/login");
        }
      }
    }
  };

  return (
    <Wrapper>
      <GiftCardSelector
        value={message.value}
        onChange={message.onChange}
        error={message.error}
      />
      <Divider />
      <SenderForm
        value={sender.value}
        onChange={sender.onChange}
        error={sender.error}
      />
      <Divider />
      <ReceiverForm
        receiverList={receiverList}
        setReceiverList={setReceiverList}
      />
      <Divider />
      <GiftInfo product={product.data} />
      <OrderBtn onClick={handleOrder}>
        {totalPrice.toLocaleString()}원 주문하기
      </OrderBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 720px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.default};
  padding-top: 3px;
  display: block;
`;

const Divider = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
`;

const OrderBtn = styled.button`
  width: 100%;
  max-width: 720px;
  height: 3.125rem;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: 0px auto;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.kakao.yellow.default};
  border: none;
  color: ${({ theme }) => theme.colors.gray[900]};
  transition:
    background-color 200ms,
    color 200ms;s
  ${({ theme }) => theme.typography.title1Bold};
  cursor: pointer;
`;
