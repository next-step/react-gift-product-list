/** @jsxImportSource @emotion/react */
import * as S from "@/styles/OrderPageStyles";
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { orderFormSchema } from "@/validations/orderSchema";
import type { OrderFormValues } from "@/validations/orderSchema";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Navigation } from "@/components/header/Navigation";
import MessageCardSection from "@/components/order/MessageCardSection";
import SenderInfoSection from "@/components/order/SenderInfoSection";
import ReceiverModal from "@/components/order/ReceiverModal";
import ReceiverTable from "@/components/order/ReceiverTable";
import OrderSummary from "@/components/order/OrderSummary";
import OrderButton from "@/components/order/OrderButton";

import { getProductSummary } from "@/api/product";
import type { ProductSummary } from "@/api/product";
import { createOrder } from "@/api/orderapi";

const OrderPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<ProductSummary | null>(null);
  const [isReceiverModalOpen, setReceiverModalOpen] = useState(false);

  const methods = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      senderName: "",
      message: "",
      selectedCardId: null,
      receivers: [],
    },
    mode: "onBlur",
  });

  const { handleSubmit, watch, setValue } = methods;
  const receivers = watch("receivers") ?? [];

  const totalQuantity = receivers.reduce(
    (sum, r) => sum + (r.quantity ?? 0),
    0
  );
  const totalAmount = (product?.price.sellingPrice ?? 0) * totalQuantity;

  const onReceiverComplete = (data: OrderFormValues["receivers"]) => {
    setValue("receivers", data);
  };

  const onValid = async (data: OrderFormValues) => {
    if (!product) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      await createOrder(data, product.id, token);
      toast.success("주문이 성공적으로 완료되었습니다!");
      navigate("/", { replace: true });
    } catch (err: any) {
      const msg =
        err?.response?.data?.data?.message ||
        "주문 요청 중 오류가 발생했습니다.";
      toast.error(msg);
    }
  };

  const fetchProduct = useCallback(async () => {
    if (!id || isNaN(Number(id))) {
      toast.error("잘못된 상품 ID입니다.");
      navigate("/not-found", { replace: true });
      return;
    }

    try {
      const data = await getProductSummary(Number(id));
      setProduct(data);
    } catch (err: any) {
      const msg =
        err?.response?.data?.data?.message ||
        "상품 정보를 불러오지 못했습니다.";
      toast.error(msg);
      navigate("/not-found", { replace: true });
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (!product) return null;

  return (
    <PageLayout>
      <PageContainer>
        <Navigation />

        <FormProvider {...methods}>
          <S.Form onSubmit={handleSubmit(onValid)}>
            <S.Container>
              <S.SectionCard>
                <MessageCardSection />
              </S.SectionCard>

              <S.SectionCard>
                <SenderInfoSection />
              </S.SectionCard>

              <S.SectionCard>
                <S.SectionHeader>
                  <S.SectionTitle>받는 사람</S.SectionTitle>
                  <S.AddReceiverButton
                    type="button"
                    onClick={() => setReceiverModalOpen(true)}
                  >
                    {receivers.length > 0 ? "수정" : "추가"}
                  </S.AddReceiverButton>
                </S.SectionHeader>

                {receivers.length === 0 ? (
                  <S.EmptyBox>
                    <S.EmptyText>
                      받는 사람이 없습니다.
                      <br />
                      받는 사람을 추가해주세요.
                    </S.EmptyText>
                  </S.EmptyBox>
                ) : (
                  <ReceiverTable />
                )}
              </S.SectionCard>

              <S.SectionCard>
                <OrderSummary product={product} />
              </S.SectionCard>
            </S.Container>

            <S.StickyFooter>
              <S.StickyInner>
                <OrderButton amount={totalAmount} type="submit" />
              </S.StickyInner>
            </S.StickyFooter>
          </S.Form>
        </FormProvider>

        <ReceiverModal
          isOpen={isReceiverModalOpen}
          onClose={() => setReceiverModalOpen(false)}
          onComplete={onReceiverComplete}
        />
      </PageContainer>
    </PageLayout>
  );
};

export default OrderPage;
