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

const OrderPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = Number(id);
  const {
    data: product,
    status,
    error,
  } = useApiRequest<ProductSummary>({
    url: `/api/products/${productId}/summary`,
    method: "get",
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
      sender: "",
      receivers: [],
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

  const onSubmit = (data: FullOrderFormValues) => {
    if (!product) return;
    console.log(data);
    alert(
      `주문이 완료되었습니다.\n상품명: ${product.name}\n구매 수량: ${data.receivers.reduce(
        (acc, cur) => acc + cur.quantity,
        0
      )}\n발신자 이름: ${data.sender}\n메시지: ${data.message}`
    );
    navigate("/", { replace: true });
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
