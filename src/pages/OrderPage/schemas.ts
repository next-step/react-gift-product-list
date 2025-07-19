import { z } from "zod";
import { VALIDATE_LABELS } from "./constants/validateLabels";
import { validatePhoneNumber } from "./utils/validation";
import { RECEIVER_SECTION_CONSTANTS } from "./constants/receiverSection";
import type { OrderCardType } from "@/types/OrderCardType";

export interface MessageCardFormData {
  messageCard: OrderCardType;
  cardMessage: string;
}

export const messageCardSchema = z.object({
  messageCard: z.object({
    id: z.number(),
    thumbUrl: z.string(),
    imageUrl: z.string(),
    defaultTextMessage: z.string(),
  }),
  cardMessage: z.string().nonempty(VALIDATE_LABELS.MESSAGE_EMPTY),
});

export interface SenderFormData {
  senderName: string;
}

export const senderSchema = z.object({
  senderName: z.string().nonempty(VALIDATE_LABELS.NAME_EMPTY),
});

export const receiverItemSchema = z.object({
  name: z.string().nonempty(RECEIVER_SECTION_CONSTANTS.NAME_ERROR),
  phoneNumber: z
    .string()
    .nonempty(RECEIVER_SECTION_CONSTANTS.PHONE_ERROR)
    .refine(
      (value) => validatePhoneNumber(value),
      VALIDATE_LABELS.PHONE_INVALID
    ),
  quantity: z.string().nonempty(RECEIVER_SECTION_CONSTANTS.QUANTITY_ERROR),
});

export const receiversSchema = z.object({
  receivers: z.array(receiverItemSchema).superRefine((receivers, ctx) => {
    const phoneNumberSet = new Set<string>();

    receivers.forEach((receiver, index) => {
      if (receiver.phoneNumber && phoneNumberSet.has(receiver.phoneNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATE_LABELS.PHONE_DUPLICATE,
          path: [index, "phoneNumber"],
        });

        return;
      }

      phoneNumberSet.add(receiver.phoneNumber);
    });
  }),
});
