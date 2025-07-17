import styled from "@emotion/styled";
import CardSelector from "@src/components/OrderPanels/CardSelector";
import ProductCard from "@src/components/OrderPanels/ProductCard";
import AdvancedInput from "@src/components/shared/AdvancedInput";
import InputGroup from "@src/components/shared/InputGroup";
import UserContext from "@src/contexts/UserContext";
import { productMockData } from "@src/mock/productMockData";
import { PATH } from "@src/router/Router";
import theme from "@src/styles/kakaoTheme";
import { useCallback, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BatchReceiverInput from "@src/components/OrderPanels/BatchReceiverInput";
import { useForm, Controller, FormProvider, useWatch } from "react-hook-form";
import {
  fetchOrder,
  fetchProductSummary,
  type OrderBody
} from "@src/apis/BackEnd/apiList";
import useFetchState from "@src/hooks/useFetchState";
import PendingSpinner from "@src/components/shared/PendingSpinner";
import { ToastContainer, toast } from "react-toastify";

export type Receiver = {
  id: string;
  name: string;
  phoneNumber: string;
  quantity: string;
};

export type FormType = {
  cardId: string;
  message: string;
  sender: string;
  receivers: Receiver[];
};

export type ProductData = {
  imageURL: string;
  id: number;
  name: string;
  brandName: string;
  price: number;
};

function OrderPage() {
  const navigate = useNavigate();
  const params = useParams();
  const userContext = useContext(UserContext);

  const redirectLogin = (path: string, id: string | undefined) => {
    navigate(PATH.LOGIN + `?redirect=${encodeURIComponent(path)}/${id}`);
  };

  const formHooks = useForm({
    defaultValues: {
      cardId: "",
      message: "",
      sender: userContext?.user.value || "",
      receivers: []
    }
  });

  const orderSuccess = (data: FormType) => {
    alert(
      `주문이 완료되었습니다.\n상품명: ${
        productData.data?.name
      }\n구매 수량: ${receivers.reduce(
        (sum: number, r: Receiver) => sum + parseInt(r.quantity),
        0
      )}\n발신자 이름: ${data.sender}\n메세지: ${data.message}`
    );
    navigate(PATH.MAIN);
  };

  const orderHandler = async (data: FormType) => {
    const orderInfo: OrderBody = {
      productId: productData.data!.id,
      message: formHooks.getValues("message"),
      messageCardId: formHooks.getValues("cardId").toString(),
      ordererName: formHooks.getValues("sender"),
      receivers: formHooks.getValues("receivers").map((receiver: Receiver) => ({
        name: receiver.name,
        phoneNumber: receiver.phoneNumber,
        quantity: parseInt(receiver.quantity)
      }))
    };
    if (userContext?.authToken.value) {
      const response = await fetchOrder(orderInfo, userContext.authToken.value);
      console.log(response);
      if (response?.status) {
        if (response.status === 401) {
          redirectLogin(PATH.ORDER, params.id);
          return;
        }
        if (response.status >= 400 && response.status < 500) {
          toast(response.data.data.message, {
            type: "error",
            position: "bottom-center"
          });
        }
        if (response.status === 201) {
          orderSuccess(data);
        }
      }
    }
  };

  const receivers = useWatch({
    control: formHooks.control,
    name: "receivers"
  });

  useEffect(() => {
    if (!userContext?.authToken.value) {
      redirectLogin(PATH.ORDER, params.id);
    }
  }, [userContext?.authToken.value]);

  //product summary fetch logic
  const productId = useParams().id ?? "";
  const update = useCallback(async () => {
    const response = await fetchProductSummary(productId);
    if (!response) {
      console.error("fetchProductSummary에 실패하였습니다.");
      return;
    }

    if (response.status >= 400 && response.status < 500) {
      navigate(`/?err=${encodeURIComponent(response.data.data.message)}`);
      return;
    }

    return response;
  }, [productId]);
  const productData = useFetchState<ProductData>(update);

  return (
    <>
      {productData.status === "pending" && <PendingSpinner />}
      {productData.status === "done" && (
        <FormProvider {...formHooks}>
          <form onSubmit={formHooks.handleSubmit(orderHandler)}>
            <OrderPageWrapper>
              <CardSelector messageName="message" cardName="cardId" />
              <InputGroup title="보내는 사람">
                <Controller
                  name="sender"
                  control={formHooks.control}
                  rules={{ required: "이름을 입력해주세요." }}
                  render={({ field, fieldState }) => (
                    <AdvancedInput
                      placeholder="이름을 입력하세요."
                      type="text"
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                <Sub>
                  * 실제 선물 발송 시 발신자이름으로 반영되는 정보입니다.
                </Sub>
              </InputGroup>
              <BatchReceiverInput />
              <InputGroup title="상품 정보">
                <ProductCard productData={productData.data} />
              </InputGroup>
              <FooterButton type="submit">
                {productMockData.price.sellingPrice *
                  receivers.reduce(
                    (sum: number, r: Receiver) => sum + parseInt(r.quantity),
                    0
                  )}
                원 주문하기
              </FooterButton>
            </OrderPageWrapper>
          </form>
        </FormProvider>
      )}
      <ToastContainer />
    </>
  );
}

const FooterButton = styled.button`
  height: 100px;
  width: 100%;
  padding: 20px;
  font-weight: bold;
  position: sticky;
  border: none;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.yellow.yellow600};
`;

const Sub = styled.p`
  font-size: 12px;
`;

const OrderPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  height: 80vh;
`;

export default OrderPage;
