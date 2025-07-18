import styled from "@emotion/styled";
import Container from "@/components/common/Container";
import Divider from "@/components/common/Divider";
import Order, { type RecipientType } from "@/pages/Order/components/Order";
import { useFormContext } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { getCookieValue } from "@/utils/cookie";
import { AUTH_COOKIE_KEY_TOKEN, useAuth } from "@/contexts/authContext";
import { AxiosHeaders } from "axios";
import { ROUTE_PATH } from "@/components/routes/routePath";
import { useNavigate } from "react-router-dom";
import type { ErrorData } from "@/types/FetchErrorData";
import { showFetchErrorToast, showFetchSuccessToast } from "@/utils/showFetchToast";

interface OrderData {
  success: boolean;
}
interface OrderBodyData {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: RecipientType[];
}

const OrderPage = () => {
  return (
    <Order>
      <OrderPageContent />
    </Order>
  );
};

const OrderPageContent = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { handleSubmit: createSubmitHandler, getValues } = useFormContext();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [error, setError] = useState<ErrorData | undefined>(undefined);
  const { data, fetchData } = useFetch<OrderData, OrderBodyData>("/api/order", { method: "POST", autoFetch: false });

  const navigate = useNavigate();
  const { logout } = useAuth();
  const goHome = useCallback(() => navigate(ROUTE_PATH.HOME), [navigate]);
  const goLogin = useCallback(() => {
    logout();
    navigate(ROUTE_PATH.LOGIN);
  }, [logout, navigate]);

  const onSubmit = async (data: any) => {
    const headers = new AxiosHeaders({ Authorization: getCookieValue(AUTH_COOKIE_KEY_TOKEN) ?? "" });
    const body: OrderBodyData = {
      productId: data.productId,
      message: data.message,
      messageCardId: `card${data.cardId}`,
      ordererName: data.sender,
      receivers: data.recipients,
    };
    const responseData = await fetchData(headers, body);
    if (responseData.error) setError(responseData.error);
  };
  useEffect(() => {
    if (data?.success) {
      showFetchSuccessToast("주문에 성공했습니다.", goHome);
    }
    if (error?.statusCode === 401) {
      showFetchErrorToast(error.statusCode, "유효하지 않은 계정입니다.", goLogin);
    } else if (error) {
      showFetchErrorToast(error.statusCode, error.message);
    }
  }, [data, error, goHome, goLogin]);
  return (
    <Container>
      <Content onSubmit={createSubmitHandler(onSubmit)}>
        <Order.Card />
        <Divider spacing="0.5rem" fill={false} />
        <Order.Sender />
        <Divider spacing="0.5rem" fill={false} />
        <Order.Recipient openModal={openModal} />
        <Divider spacing="0.5rem" fill={false} />
        <Order.Product />
        <Divider spacing="3.125rem" />
        <Order.Btn />
      </Content>
      {isModalOpen && (
        <Order.Modal closeModal={closeModal} initialRecipients={JSON.parse(JSON.stringify(getValues("recipients")))} />
      )}
    </Container>
  );
};

export default OrderPage;

const Content = styled.form`
  background-color: ${({ theme }) => theme.color.backgroundColor.default};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
