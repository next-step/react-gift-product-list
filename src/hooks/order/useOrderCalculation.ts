import { useMemo } from "react";
import { useOrderForm } from "@/hooks/order/useOrderForm";

export const useOrderCalculation = () => {
  const { watch } = useOrderForm();
  const product = watch("product");
  const receivers = watch("receivers");

  const totalQuantity = useMemo(() => {
    if (!receivers || receivers.length === 0) {
      return 0;
    }

    return receivers.reduce((total, receiver) => {
      return total + (receiver.quantity || 0);
    }, 0);
  }, [receivers]);

  const totalPrice = useMemo(() => {
    if (!product || !receivers || receivers.length === 0) {
      return 0;
    }

    const productPrice = product.price.sellingPrice || 0;

    return productPrice * totalQuantity;
  }, [product, totalQuantity, receivers]);

  return {
    totalPrice,
    totalQuantity,
  };
};
