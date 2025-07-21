import { useFormContext } from "react-hook-form";
import type { OrderFormData } from "@/contexts/order/order-schema";

export const useOrderForm = () => {
  const context = useFormContext<OrderFormData>();

  if (!context) {
    throw new Error("useOrderForm은 OrderProvider 내부에서 사용되어야 합니다.");
  }

  return context;
};
