/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import MessageCardSection from "@/pages/orderpage/MessageCardSection";
import SenderInfoSection from "@/pages/orderpage/SenderInfoSection";
import ReceiverInfoSection from "@/pages/orderpage/ReceiverInfoSection";
import ProductSummarySection from "@/pages/orderpage/ProductSummarySection";
import { useForm, FormProvider } from "react-hook-form";
import OrderButton from "@/components/common/BaseButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { fullOrderSchema } from "@/utils/validator";
import type { FullOrderFormValues } from "@/utils/validator";
import { useApiRequest } from "@/hooks/useApiRequest";
import type { ProductSummary } from "@/types/api_types";
import { useAuth } from "@/contexts/AuthContext";
import { API_ENDPOINTS } from "@/utils/API_ENDPOINTS";

const OrderPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = Number(id);
  const { data: product, status } = useApiRequest<ProductSummary>({
    url: API_ENDPOINTS.PRODUCT_SUMMARY(productId),
    method: "get",
  });

  const { userInfo } = useAuth();

  const createOrderRequest = useApiRequest<{ success: boolean }>({
    url: API_ENDPOINTS.ORDER,
    method: "post",
    manual: true,
    headers: {
      Authorization: userInfo?.authToken || "",
    },
  });

  useEffect(() => {
    if (status === "error") {
      toast.error("오류가 발생했습니다. 홈으로 이동합니다.", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    }
  }, [status, navigate]);

  const methods = useForm<FullOrderFormValues>({
    resolver: zodResolver(fullOrderSchema),
    defaultValues: {
      message: "",
      sender: userInfo?.name ?? "",
      receivers: [],
      messageCardId: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  if (status === "loading") {
    return <p>로딩 중...</p>;
  }
  if (status === "error") {
    return null;
  }
  if (status === "success" && !product) {
    return <Navigate to="/notfound" replace />;
  }

  const onSubmit = async (data: FullOrderFormValues) => {
    if (data.receivers.length === 0) {
      toast.error("받는 사람이 없습니다.");
      return;
    }

    if (!product) return;

    try {
      const result = await createOrderRequest.refetch({
        data: {
          productId: product.id,
          message: data.message,
          messageCardId: data.messageCardId,
          ordererName: data.sender,
          receivers: data.receivers,
        },
      });

      if (result?.data?.success) {
        alert(
          `주문이 완료되었습니다.
상품명: ${product.name}
구매 수량: ${data.receivers.reduce((acc, cur) => acc + cur.quantity, 0)}
발신자 이름: ${data.sender}
메시지: ${data.message}`
        );
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        toast.error("인증에 실패했습니다.");
        navigate("/login", { replace: true });
      } else {
        toast.error("주문에 실패했습니다.");
      }
    }
  };

  if (!product) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <MessageCardSection error={errors.message?.message} />
        <SenderInfoSection error={errors.sender?.message} />
        <ReceiverInfoSection />
        <ProductSummarySection product={product} />
        <OrderButton
          color="yellow"
          label="주문하기"
          size="large"
          type="submit"
        />
      </Form>
    </FormProvider>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 10px;
`;

export default OrderPage;
