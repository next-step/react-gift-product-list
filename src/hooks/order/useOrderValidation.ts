import { useCallback } from "react";
import { useOrderForm } from "@/hooks/order/useOrderForm";
import { isOrderComplete } from "@/contexts/order/order-schema";

export const useOrderValidation = () => {
  const { formState, trigger, watch } = useOrderForm();
  const { errors, isValid } = formState;

  const checkIsOrderComplete = useCallback(() => {
    const formData = watch();
    return isOrderComplete(formData);
  }, [watch]);

  const getValidationErrors = useCallback(() => {
    return Object.values(errors)
      .filter(Boolean)
      .map(error => error.message)
      .filter(
        (message): message is string =>
          typeof message === "string" && message.length > 0,
      );
  }, [errors]);

  const validateAllFields = useCallback(async (): Promise<boolean> => {
    return await trigger();
  }, [trigger]);

  return {
    isOrderComplete: checkIsOrderComplete,
    getValidationErrors,
    validateAllFields,
    isFormValid: isValid,
  };
};
