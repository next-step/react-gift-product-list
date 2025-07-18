import styled from "@emotion/styled";
import Container from "@/components/common/Container";
import Divider from "@/components/common/Divider";
import Order from "@/pages/Order/components/Order";
import { useFormContext } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { getCookieValue } from "@/utils/cookie";
import { AUTH_COOKIE_KEY_TOKEN, useAuth } from "@/contexts/authContext";
import { AxiosHeaders } from "axios";
import { toast } from "react-toastify";
import { ROUTE_PATH } from "@/components/routes/routePath";
import { useNavigate } from "react-router-dom";
import type { ErrorData } from "@/types/FetchErrorData";

interface OrderData {
  data: {
    success: boolean;
  };
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
  const { data, fetchData } = useFetch<OrderData>("/api/order", { method: "POST", autoFetch: false });
  const navigate = useNavigate();
  const { logout } = useAuth();
  const goHome = useCallback(() => navigate(ROUTE_PATH.HOME), [navigate]);
  const goLogin = useCallback(() => {
    logout();
    navigate(ROUTE_PATH.LOGIN);
  }, [logout, navigate]);
  const onSubmit = async (data: any) => {
    const headers = new AxiosHeaders({ Authorization: getCookieValue(AUTH_COOKIE_KEY_TOKEN) ?? "" });
    const body = {
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
    if (data?.data.success) {
      toast.success("주문에 성공했습니다.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose: goHome,
      });
    }
    if (error?.data.statusCode === 401) {
      goLogin();
    }
  }, [data?.data, error, goHome, goLogin]);
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
