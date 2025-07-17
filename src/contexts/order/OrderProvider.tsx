import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "./order-schema";
import type { OrderFormData } from "./order-schema";
import type { ReactNode } from "react";
import { getUserInfo } from "@/utils";

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const userName = getUserInfo()?.name;
  const methods = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    mode: "onChange",
    defaultValues: {
      product: null,
      cardTemplate: null,
      message: "",
      senderName: userName,
      receivers: [],
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
