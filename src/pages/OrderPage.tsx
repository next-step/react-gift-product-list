import TheHeader from "@/components/layout/TheHeader";
import { useParams, useLocation, useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { ROUTE_PATH } from "@/routes/paths";
import { cards } from "@/data/card";
import type { Card } from "@/types/card";
import styled from "@emotion/styled";
import CardSection from "@/components/order/CardSection";
import SenderSection from "@/components/order/SenderSection";
import ReceiverSection from "@/components/order/ReceiverSection";
import GiftInformationSection from "@/components/order/GiftInformationSection";
import { useUserInfo } from "@/contexts/UserInfoContext";
import { FormProvider, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { OrderFormValue } from "@/types/order";
import { fetchProductsSummary } from "@/api/productSummary";
import useApiRequest from "@/hooks/useApiRequest";
import { toast } from "react-toastify";
import type { OrderRequest } from "@/types/order";
import { postOrder } from "@/api/order";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<Card>(cards[0]);
  const sessionUserInfo = sessionStorage.getItem("kakaotech/userInfo");
  const defaultName = sessionUserInfo ? JSON.parse(sessionUserInfo).name : "";
  const token = sessionUserInfo ? JSON.parse(sessionUserInfo).authToken : "";
  const methods = useForm<OrderFormValue>({
    mode: "onChange",
    defaultValues: {
      message: selectedCard.defaultTextMessage,
      sender: defaultName,
      receiver: [],
    },
  });

  const watchedReceiver = methods.watch("receiver");

  const userInfo = useUserInfo();

  useEffect(() => {
    methods.setValue("message", selectedCard.defaultTextMessage);
  }, [selectedCard, methods]);

  useEffect(() => {
    if (!userInfo?.email) {
      navigate(`${ROUTE_PATH.LOGIN}?redirect=${location.pathname}`, {
        replace: true,
      });
    }
  }, [location.pathname, navigate, userInfo]);

  const { id } = useParams<{ id: string }>();
  const requestFn = useCallback(() => fetchProductsSummary(Number(id)), [id]);
  const {
    data: gift,
    isLoading,
    isError,
    error,
  } = useApiRequest({
    requestFn,
  });

  useEffect(() => {
    if (!gift && !isLoading && isError) {
      toast.error(error);
      navigate(ROUTE_PATH.HOME, { replace: true });
    }
  }, [gift, isLoading, isError, navigate, error]);

  if (!gift) return null;

  const onValid: SubmitHandler<OrderFormValue> = data => {
    const totalCount = data.receiver.reduce(
      (sum, receiver) => sum + Number(receiver.quantity),
      0,
    );

    const orderRequestData: OrderRequest = {
      productId: Number(id),
      message: data.message,
      messageCardId: String(selectedCard.id),
      ordererName: data.sender,
      receivers: data.receiver.map(receiver => ({
        name: receiver.name,
        phoneNumber: receiver.phoneNumber,
        quantity: Number(receiver.quantity),
      })),
    };

    postOrder(orderRequestData, token)
      .then(() => {
        alert(
          [
            "주문이 완료되었습니다.",
            `상품명: ${gift.name}`,
            `구매 수량: ${totalCount}개`,
            `보낸 사람: ${data.sender}`,
            `메시지: ${data.message}`,
          ].join("\n"),
        );
        navigate(ROUTE_PATH.HOME, { replace: true });
      })
      .catch(error => {
        toast.error(
          error.errorMessage || "주문에 실패했습니다. 다시 시도해주세요.",
        );
        if (error.errorStatus === 401) {
          navigate(ROUTE_PATH.LOGIN, { replace: true });
          return;
        }
      });
  };

  return (
    <>
      <TheHeader />
      <Main>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onValid)}>
            <CardSection
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
            />
            <SenderSection />
            <ReceiverSection />
            <GiftInformationSection selectedGift={gift} />
            <Button type="submit">
              {gift.price *
                watchedReceiver.reduce(
                  (total, receiver) => total + Number(receiver.quantity || 0),
                  0,
                )}
              원 주문하기
            </Button>
          </Form>
        </FormProvider>
      </Main>
    </>
  );
};

export default OrderPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray.gray200};
  padding-bottom: 3.125rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing2};
`;

const Button = styled.button`
  z-index: 100;
  width: 100%;
  max-width: 720px;
  height: 3.125rem;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.spacing0} auto;
  background-color: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  font-size: ${({ theme }) => theme.typography.title2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title2Bold.lineHeight};
`;
