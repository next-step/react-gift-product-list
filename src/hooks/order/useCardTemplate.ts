import { useEffect } from "react";
import { useOrderForm } from "@/hooks/order/useOrderForm";
import { cardTemplate } from "@/__mock__";
import type { CardTemplateType } from "@/types";

export const useCardTemplate = () => {
  const { watch, setValue } = useOrderForm();
  const currentCardTemplate = watch("cardTemplate");

  useEffect(() => {
    if (!currentCardTemplate) {
      const defaultTemplate = cardTemplate[0];
      if (defaultTemplate) {
        setValue("cardTemplate", defaultTemplate);
        setValue("message", defaultTemplate.defaultTextMessage || "");
      }
    }
  }, [currentCardTemplate, setValue]);

  const setCardTemplate = (template: CardTemplateType) => {
    setValue("cardTemplate", template);
    setValue("message", template.defaultTextMessage || "");
  };

  return {
    cardTemplate: currentCardTemplate,
    setCardTemplate,
  };
};
