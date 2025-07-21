import { useCallback } from "react";
import { useOrderForm } from "@/hooks/order/useOrderForm";
import { isOrderComplete } from "@/contexts/order/order-schema";

export const useOrderValidation = () => {
  const { formState, trigger, watch } = useOrderForm();
  const { isValid } = formState;

  const checkIsOrderComplete = useCallback(() => {
    const formData = watch();
    return isOrderComplete(formData);
  }, [watch]);

  const validateAllFields = useCallback(async (): Promise<boolean> => {
    return await trigger();
  }, [trigger]);

  return {
    isOrderComplete: checkIsOrderComplete,
    validateAllFields,
    isFormValid: isValid,
  };
};
