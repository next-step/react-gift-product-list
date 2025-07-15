import PageContainer from "@/components/PageContainer";
import CardSelectionSection from "@/sections/OrderSection/CardSelectionSection";
import MessageInputSection from "@/sections/OrderSection/MessageInputSection";
import SenderSection from "@/sections/OrderSection/SenderSection";
import ReceiverModalSection from "@/sections/OrderSection/ReceiverModalSection";
import ProductInfoSection from "@/sections/OrderSection/ProductInfoSection";
import BottomOrderBar from "@/sections/OrderSection/BottomOrderBar";
import { useParams, useNavigate } from "react-router";
import { giftRankingData } from "@/mocks/giftRankingData";
import { useState } from "react";
import { messageCardData } from "@/mocks/messageCardData";
import { withAuth } from "@/hoc/withAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, type OrderFormData } from "@/utils/validateOrderSchema";
import * as z from "zod";


type FormData = z.infer<typeof orderSchema>;

function OrderPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const rank = Number(id);
  const repeatedData = Array(12).fill(null).flatMap(() => giftRankingData);
  const product = repeatedData[rank - 1];

  const defaultCardId = messageCardData[0]?.id ?? 1;
  const [selectedCardId, setSelectedCardId] = useState(defaultCardId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields, isSubmitted },
    setValue,
    watch,
    trigger,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      message: "",
      sender: "",
      receivers: [],
    },
  });

  const totalQuantity = watch("receivers").reduce((sum, r) => sum + (r.quantity || 0), 0);

  const totalPrice = product?.price.sellingPrice * totalQuantity;

  const onSubmit = (data: FormData) => {
    const receiverLines = data.receivers.map((r) => `- ${r.name} / ${r.phone} / 수량: ${r.quantity}`).join("\n");
    const message = 
`🎁 ${rank}등 상품 주문 완료!
보낸 사람: ${data.sender}
메시지: ${data.message}
받는 사람 목록:
${receiverLines}`;

    alert(message);
    navigate("/");
  };

  if (!product || isNaN(rank) || rank < 1 || rank > repeatedData.length) {
    return <PageContainer>존재하지 않는 상품입니다.</PageContainer>;
  }

  return (
    <PageContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardSelectionSection
          selectedCardId={selectedCardId}
          onSelect={setSelectedCardId}
          setMessage={(msg) => setValue("message", msg)}
        />
        <MessageInputSection
          register={register}
          error={errors.message?.message || ""}
          touched={!!touchedFields.message || isSubmitted}
        />
        <SenderSection
          register={register}
          error={errors.sender?.message || ""}
          touched={!!touchedFields.sender || isSubmitted}
        />
        <ReceiverModalSection
          register={register}
          control={control}
          errors={errors}
          trigger={trigger}
        />
        <ProductInfoSection
          product={{
            imageUrl: product.imageURL,
            name: product.name,
            brand: product.brandInfo.name,
            price: product.price.sellingPrice,
          }}
        />
        <BottomOrderBar totalPrice={totalPrice} isValid onOrder={handleSubmit(onSubmit)} />
      </form>
    </PageContainer>
  );
}
const ProtectedOrderPage = withAuth(OrderPage);
export default ProtectedOrderPage;
