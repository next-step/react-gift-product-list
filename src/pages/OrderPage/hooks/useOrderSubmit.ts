import { useAuth } from "@/contexts/AuthContext";
import { createOrder } from "@/data/api";
import { useFetch } from "@/hooks/useFetch";
import type { Order } from "@/types/Order";
import type { Receiver } from "@/types/Receiver";
import type { OrderCardType } from "@/types/OrderCardType";
import type { ProductInfoSummary } from "@/types/ProductInfoSummary";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ERROR_MESSAGES } from "../constants/apiMessage";
import { AxiosError } from "axios";
import { ROUTES } from "@/constants/routes";
import { ORDER_MESSAGES } from "../constants/alert";
import { isUnauthorized } from "@/constants/httpStatus";

interface UseOrderSubmitProps {
  validateAllForms: () => Promise<boolean>;
  setIsSubmittedOnce: React.Dispatch<React.SetStateAction<boolean>>;
  getFormValues: () => {
    senderName: string;
    cardMessage: string;
    totalQuantity: number;
  };
  receivers: Receiver[];
  messageCard: OrderCardType;
  product: ProductInfoSummary | null;
}

export const useOrderSubmit = ({
  validateAllForms,
  setIsSubmittedOnce,
  getFormValues,
  receivers,
  messageCard,
  product,
}: UseOrderSubmitProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);

  const { data } = useFetch<{ success: boolean }>({
    fetchFn: () => {
      if (!order) {
        return Promise.reject(new Error(API_ERROR_MESSAGES.ORDER_NOT_FOUND));
      }
      return createOrder(user?.authToken || "", order);
    },
    errorHandler: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status && isUnauthorized(error.response?.status)) {
          navigate(ROUTES.LOGIN);
        }
      }
    },
    enabled: !!order, // order가 있을 때만 실행
    deps: [order], // order가 변경되면 자동 실행
  });

  useEffect(() => {
    if (data && data.success) {
      navigate(ROUTES.HOME);
    }
  }, [data, navigate]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await validateAllForms();

    if (!isValid) {
      setIsSubmittedOnce(true);
    }

    if (isValid) {
      const formValues = getFormValues();
      alert(
        ORDER_MESSAGES.ORDER_COMPLETE_TEMPLATE({
          productName: product?.name || "",
          totalQuantity: formValues.totalQuantity,
          senderName: formValues.senderName,
          cardMessage: formValues.cardMessage,
        })
      );

      const transformedReceivers = receivers.map((receiver) => ({
        ...receiver,
        quantity: Number(receiver.quantity),
      }));

      const orderData: Order = {
        productId: product?.id || 0,
        message: formValues.cardMessage,
        messageCardId: messageCard.id.toString(),
        ordererName: formValues.senderName,
        receivers: transformedReceivers,
      };

      setOrder(orderData);
      return;
    }
  };

  return {
    onSubmitHandler,
  };
};
