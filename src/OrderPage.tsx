import PageContainer from "@/components/PageContainer";
import CardSelectionSection from "@/sections/OrderSection/CardSelectionSection";
import MessageInputSection from "@/sections/OrderSection/MessageInputSection";
import SenderSection from "@/sections/OrderSection/SenderSection";
import ReceiverModalSection from "@/sections/OrderSection/ReceiverModalSection";
import ProductInfoSection from "@/sections/OrderSection/ProductInfoSection";
import BottomOrderBar from "@/sections/OrderSection/BottomOrderBar";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { messageCardData } from "@/mocks/messageCardData";
import { withAuth } from "@/hoc/withAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, type OrderFormData } from "@/utils/validateOrderSchema";
import * as z from "zod";
import { getProductSummary, type ProductSummary } from "@/apis/product";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useAuth } from "@/hooks/useAuth";


type FormData = z.infer<typeof orderSchema>;

function OrderPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const productId = Number(id);
  const [product, setProduct] = useState<ProductSummary | null>(null);

  useEffect(() => {
    if (isNaN(productId)) {
      navigate("/");
      return;
    }

    const fetchProduct = async () => {
      try {
        const data = await getProductSummary(productId);
        setProduct(data);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message ?? "상품 정보를 불러올 수 없습니다.");
        } else {
          toast.error("알 수 없는 오류가 발생했습니다.");
        }
        navigate("/");
      }
    };

    fetchProduct();
  }, [productId, navigate]);


  const defaultCardId = messageCardData[0]?.id ?? 1;
  const [selectedCardId, setSelectedCardId] = useState(defaultCardId);

  const { user } = useAuth();

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

  useEffect(() => {
    if (user?.name) {
      setValue("sender", user.name);
    }
  }, [user?.name, setValue]);

  const totalQuantity = watch("receivers").reduce((sum, r) => sum + (r.quantity || 0), 0);

  const totalPrice = product ? product.price * totalQuantity : 0;

  const onSubmit = (data: FormData) => {
    const receiverLines = data.receivers.map((r) => `- ${r.name} / ${r.phone} / 수량: ${r.quantity}`).join("\n");
    const message = 
`🎁 ${product?.name} 주문 완료!
보낸 사람: ${data.sender}
메시지: ${data.message}
받는 사람 목록:
${receiverLines}`;

    alert(message);
    navigate("/");
  };

  if (!product) {
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
            brand: product.brandName,
            price: product.price,
          }}
        />
        <BottomOrderBar totalPrice={totalPrice} isValid onOrder={handleSubmit(onSubmit)} />
      </form>
    </PageContainer>
  );
}
const ProtectedOrderPage = withAuth(OrderPage);
export default ProtectedOrderPage;
