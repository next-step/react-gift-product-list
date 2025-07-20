import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRouter } from "@/hooks/common/useRouter";
import { useApiStatus } from "@/hooks/common/useApiStatus";
import {
  useOrderValidation,
  useOrderCalculation,
  useOrderForm,
} from "@/hooks/order";
import { getProductSummary } from "@/api/product";
import { createOrder } from "@/api/order/create-order";

export const useOrderPageLogic = () => {
  const { goHomePage, goLoginPage } = useRouter();
  const { watch, reset, setValue } = useOrderForm();
  const { validateAllFields, isOrderComplete } = useOrderValidation();
  const { totalQuantity } = useOrderCalculation();
  const { id } = useParams<{ id: string }>();

  const productApi = useApiStatus({
    showErrorToast: true,
  });

  const orderApi = useApiStatus({
    showSuccessToast: false,
    showErrorToast: true,
    rethrowError: true,
  });

  const order = watch();

  useEffect(() => {
    if (!id) return;

    productApi
      .execute(async () => {
        const productData = await getProductSummary(Number(id));

        setValue("product", {
          id: productData.id,
          name: productData.name,
          imageURL: productData.imageURL,
          price: {
            basicPrice: productData.price,
            discountRate: 0,
            sellingPrice: productData.price,
          },
          brandInfo: {
            name: productData.brandName,
            id: productData.id,
            imageURL: productData.imageURL,
          },
        });

        return productData;
      })
      .catch(() => {
        goHomePage();
      });
  }, [id]);

  const handleOrderSubmit = async () => {
    try {
      const isValidForm = await validateAllFields();

      if (!isValidForm) {
        return;
      }

      if (!isOrderComplete()) {
        return;
      }

      if (!order.product) {
        return;
      }

      const product = order.product;

      await orderApi.execute(async () => {
        return await createOrder({
          productId: product.id,
          message: order.message,
          messageCardId: String(order.cardTemplate?.id || ""),
          ordererName: order.senderName,
          receivers:
            order.receivers?.map(receiver => ({
              name: receiver.receiverName,
              phoneNumber: receiver.receiverPhone,
              quantity: receiver.quantity,
            })) || [],
        });
      });

      alert(
        `주문이 완료되었습니다.\n상품명: ${order.product?.name}\n구매 수량:${totalQuantity} \n발신자 이름: ${order.senderName}\n메시지: ${order.message}`,
      );
      reset();
      goHomePage();
    } catch (error) {
      console.error("주문 처리 중 오류 발생:", error);

      if (error instanceof Error) {
        goLoginPage({ redirect: false });
        return;
      }
    }
  };

  return {
    order,
    handleOrderSubmit,
    isLoading: productApi.loading || orderApi.loading,
    error: productApi.error || orderApi.error,
  };
};
