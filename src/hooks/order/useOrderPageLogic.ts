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
import { ApiError, UnauthorizedError } from "@/api/custom-error";
import { showToast } from "@/utils";
import { API_ERROR_MESSAGE } from "@/constants";

export const useOrderPageLogic = () => {
  const { goHomePage, goLoginPage } = useRouter();
  const { watch, reset, setValue } = useOrderForm();
  const { validateAllFields, isOrderComplete } = useOrderValidation();
  const { totalQuantity } = useOrderCalculation();
  const { id } = useParams<{ id: string }>();

  const productApi = useApiStatus();

  const orderApi = useApiStatus();

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
      .catch(error => {
        if (
          error instanceof ApiError &&
          error.statusCode >= 400 &&
          error.statusCode < 500
        ) {
          showToast.error(error.message);
          goHomePage();
        } else if (error instanceof UnauthorizedError) {
          showToast.error(API_ERROR_MESSAGE.LOGIN);
          goLoginPage({ redirect: false });
        } else {
          showToast.error(API_ERROR_MESSAGE.DEFAULT);
        }
      });
  }, [id]);

  const handleOrderSubmit = async () => {
    const isValidForm = await validateAllFields();
    if (!isValidForm) return;

    if (!isOrderComplete()) return;

    if (!order.product) return;

    const product = order.product;

    orderApi
      .execute(async () => {
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
      })
      .then(() => {
        alert(
          `주문이 완료되었습니다.\n상품명: ${order.product?.name}\n구매 수량:${totalQuantity} \n발신자 이름: ${order.senderName}\n메시지: ${order.message}`,
        );
        reset();
        goHomePage();
      })
      .catch(error => {
        if (error instanceof UnauthorizedError) {
          showToast.error(API_ERROR_MESSAGE.LOGIN);
          goLoginPage({ redirect: false });
        } else if (error instanceof ApiError) {
          showToast.error(`주문 실패: ${error.message}`);
        } else {
          showToast.error(API_ERROR_MESSAGE.ORDER || API_ERROR_MESSAGE.DEFAULT);
        }
        console.error("주문 처리 중 오류 발생:", error);
      });
  };

  return {
    order,
    handleOrderSubmit,
    isLoading: productApi.loading || orderApi.loading,
    error: productApi.error || orderApi.error,
  };
};
